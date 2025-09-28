// src/app/api/paypal/capture-order/route.ts
import { NextResponse } from "next/server";

const PAYPAL_MODE = (process.env.PAYPAL_MODE || "sandbox").toLowerCase();
const PAYPAL_BASE = PAYPAL_MODE === "live" ? "https://api.paypal.com" : "https://api.sandbox.paypal.com";

async function getTokenServerSide() {
  const client = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!client || !secret) throw new Error("Missing PayPal credentials");
  const basic = Buffer.from(`${client}:${secret}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE.replace("api.", "api-m.")}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  const text = await res.text();
  const j = (() => { try { return JSON.parse(text); } catch { return { raw: text }; }})();
  if (!res.ok || !j?.access_token) throw new Error("Failed retrieving PayPal token");
  return j.access_token as string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const orderID = body?.orderID || body?.id;
    if (!orderID || typeof orderID !== "string") {
      return NextResponse.json({ ok: false, error: "missing orderID" }, { status: 400 });
    }

    const token = await getTokenServerSide();

    const capRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });

    const capText = await capRes.text();
    let capJson: any;
    try { capJson = capText ? JSON.parse(capText) : {}; } catch { capJson = { raw: capText }; }

    console.log("DEBUG capture status", capRes.status);
    console.log("DEBUG capture body", capJson);

    if (!capRes.ok) {
      return NextResponse.json({ ok: false, error: "paypal capture failed", detail: capJson }, { status: 502 });
    }

    const captureStatus = capJson.status || capJson.purchase_units?.[0]?.payments?.captures?.[0]?.status;
    if (!/COMPLETED|COMPLETED_WITH_VERIFICATION/i.test(String(captureStatus))) {
      return NextResponse.json({ ok: false, error: "capture not completed", capture: capJson }, { status: 400 });
    }

    const captureObj = capJson.purchase_units?.[0]?.payments?.captures?.[0] ?? null;
    const captureId = captureObj?.id ?? null;

    // OPTIONAL: create Shopify order here using admin token if you want.
    // For now return capture info (frontend uses capture ok to redirect)
    return NextResponse.json({ ok: true, paypalCapture: capJson, shopifyOrder: null });
  } catch (e: unknown) {
    console.error("capture-order error:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
