// src/components/PaypalButtonSDK.tsx
"use client";

import { useEffect, useRef } from "react";
import type { PayPalButtonsComponentOptions } from "@paypal/paypal-js";

type Props = {
  amount: string;
  currency: string;
  productHandle?: string;
  quantity?: number;
  variantId?: string;
  email?: string;
};

export default function PaypalButtonSDK({
  amount,
  currency,
  productHandle,
  quantity = 1,
  variantId,
  email,
}: Props) {
  const paypalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;

    const isValidAmount = /^\d+(\.\d{1,2})?$/.test(String(amount));
    const isValidCurrency = typeof currency === "string" && currency.length === 3;
    if (!isValidAmount || !isValidCurrency) {
      console.error("❌ Invalid PayPal input:", { amount, currency });
      return;
    }

    const waitForSDK = () =>
      new Promise<void>((resolve) => {
        const check = () => {
          if (typeof window !== "undefined" && (window as any).paypal?.Buttons) return resolve();
          setTimeout(check, 250);
        };
        check();
      });

    const renderButtons = async () => {
      await waitForSDK();
      if (!mounted) return;

      const container = paypalRef.current;
      if (!container || !document.body.contains(container)) return;

      container.innerHTML = "";

      const Buttons = (window as any).paypal?.Buttons;
      if (typeof Buttons !== "function") {
        console.warn("❌ PayPal Buttons not available");
        return;
      }

      try {
        Buttons({
          style: {
            layout: "vertical", // biar kartu muncul di bawah
            color: "gold",
            shape: "rect",
            label: "paypal",
            tagline: false,
          },

          createOrder: async () => {
            const payload = {
              amount: String(amount).replace(",", ".").trim(),
              currency,
              productHandle,
              quantity,
            };
            const resp = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            const text = await resp.text();
            let data: any;
            try {
              data = text ? JSON.parse(text) : {};
            } catch {
              data = { raw: text };
            }

            console.log("🧾 create-order debug", resp.status, data);

            if (!resp.ok) {
              alert("Server error creating PayPal order. Check console.");
              throw new Error("create-order failed");
            }

            const orderID = data?.orderID || data?.id;
            if (!orderID || typeof orderID !== "string") {
              alert("Server returned invalid order id. Check console.");
              throw new Error("missing orderID");
            }

            return orderID;
          },

          onApprove: async (data: any) => {
            const orderID = data?.orderID || data?.id;
            if (!orderID) {
              console.error("❌ onApprove missing orderID", data);
              alert("Missing order id after approval.");
              return;
            }

            const resp = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID, variantId, quantity, email }),
            });

            const text = await resp.text();
            let result: any;
            try {
              result = text ? JSON.parse(text) : {};
            } catch {
              result = { raw: text };
            }

            console.log("✅ capture-order debug", resp.status, result);

            if (!resp.ok || !result?.ok) {
              alert("Payment succeeded but capture failed. See console.");
              console.error("❌ capture failed", result);
              return;
            }

            const shopifyOrderId = result.shopifyOrder?.order?.id;
            const redirectOrder = shopifyOrderId || orderID;
            window.location.href = `/order/thank-you?order=${encodeURIComponent(redirectOrder)}`;
          },

          onError: (err: any) => {
            const msg = String(err?.message || err);
            if (msg.includes("paypal_js_sdk_v5_unhandled_exception")) {
              console.warn("🧯 Suppressed PayPal SDK internal error:", msg);
              return;
            }

            console.error("❌ PayPal SDK error:", err);
            alert("PayPal integration error. See console.");
          },
        }).render(container);
      } catch (err) {
        console.error("❌ PayPal render error:", err);
      }
    };

    renderButtons();

    const suppressError = (e: ErrorEvent) => {
      const msg = String(e.message || "");
      if (msg.includes("paypal_js_sdk_v5_unhandled_exception")) {
        console.warn("🧯 Suppressed global PayPal SDK error:", msg);
        e.preventDefault();
      }
    };

    const suppressUnhandled = (e: PromiseRejectionEvent) => {
      const msg = String(e.reason?.message || e.reason || "");
      if (msg.includes("paypal_js_sdk_v5_unhandled_exception")) {
        console.warn("🧯 Suppressed PayPal SDK unhandled rejection:", msg);
        e.preventDefault();
      }
    };

    window.addEventListener("error", suppressError);
    window.addEventListener("unhandledrejection", suppressUnhandled);

    return () => {
      mounted = false;
      window.removeEventListener("error", suppressError);
      window.removeEventListener("unhandledrejection", suppressUnhandled);
      if (paypalRef.current) paypalRef.current.innerHTML = "";
    };
  }, [amount, currency, productHandle, quantity, variantId, email]);

  return <div ref={paypalRef} />;
}
