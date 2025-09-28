// src/components/PaypalButton.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  amount: string;
  currency?: string;
  onComplete?: (details: any) => void;
  className?: string;
};

export default function PaypalButton({ amount, currency = "USD", onComplete, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hiddenButtonRef = useRef<HTMLButtonElement | null>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const win = window as any;
    if (!containerRef.current) return;

    // If SDK not ready yet, retry shortly
    if (!win.paypal || !win.paypal.Buttons) {
      const t = setTimeout(() => {
        if (!renderedRef.current) renderButtons();
      }, 300);
      return () => clearTimeout(t);
    }

    renderButtons();

    function renderButtons() {
      try {
        // clear previous render
        containerRef.current!.innerHTML = "";

        const buttons = win.paypal.Buttons({
          style: {
            layout: "horizontal",
            color: "gold",
            shape: "rect",
            label: "paypal",
            tagline: false,
          },
          createOrder: (_data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{ amount: { value: String(amount), currency_code: currency } }],
            });
          },
          onApprove: async (_data: any, actions: any) => {
            try {
              if (actions && typeof actions.order?.capture === "function") {
                const details = await actions.order.capture();
                if (typeof onComplete === "function") onComplete(details);
              } else {
                console.warn("PayPal actions.order.capture not available");
              }
            } catch (err) {
              console.error("PayPal capture error", err);
            }
          },
          onError: (err: any) => {
            console.error("PayPal Buttons error", err);
          },
        });

        buttons.render(containerRef.current).then(() => {
          renderedRef.current = true;
          // find actual SDK button for fallback trigger (if you plan to use a lookalike)
          const btn = containerRef.current!.querySelector("button");
          if (btn) {
            hiddenButtonRef.current = btn as HTMLButtonElement;
          }
        });
      } catch (e) {
        console.error("Failed to render PayPal Buttons", e);
      }
    }

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
      renderedRef.current = false;
      hiddenButtonRef.current = null;
    };
  }, [amount, currency, onComplete]);

  // If you want a custom lookalike that triggers the SDK button, you can render it here and call hiddenButtonRef.current?.click()
  return <div ref={containerRef} id="paypal-button-container" className={className} />;
}
