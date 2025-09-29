// src/app/api/paypal/create-order/route.ts
import { NextResponse } from "next/server";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_MODE = (process.env.PAYPAL_MODE || "sandbox").toLowerCase();
const PAYPAL_BASE = PAYPAL_MODE === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

function errMsg(e: unknown) {
  if (e instanceof Error) return e.message;
  try { return typeof e === "string" ? e : JSON.stringify(e); } catch { return String(e); }
}

async function getPayPalToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("Missing PayPal server credentials");
  }
  const basic = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  const text = await res.text();
  let j: any;
  try { j = text ? JSON.parse(text) : {}; } catch { j = { raw: text }; }
  if (!res.ok) throw new Error(`token fetch failed: ${res.status} ${JSON.stringify(j)}`);
  if (!j?.access_token) throw new Error(`token missing in response: ${JSON.stringify(j)}`);
  return j.access_token as string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    // normalize and validate amount
    let rawAmount: unknown = body?.amount;
    if (typeof rawAmount === "number") rawAmount = String(rawAmount);
    if (!rawAmount || typeof rawAmount !== "string") {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    rawAmount = rawAmount.replace(",", ".").trim();
    const parsed = Number(rawAmount);
    if (Number.isNaN(parsed)) return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    const amount = parsed.toFixed(2);

    const currency = (body?.currency || "USD").toString().toUpperCase();
    const token = await getPayPalToken();

    const payload = {
      intent: "CAPTURE",
      application_context: {
        landing_page: "LOGIN",
        user_action: "PAY_NOW"
      },
      purchase_units: [{ amount: { currency_code: currency, value: amount } }]
    };

    const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const orderText = await orderRes.text();
    let orderJson: any;
    try { orderJson = orderText ? JSON.parse(orderText) : {}; } catch { orderJson = { raw: orderText }; }

    console.log("DEBUG create-order paypal status", orderRes.status);
    console.log("DEBUG create-order paypal body", orderJson);

    if (!orderRes.ok) {
      return NextResponse.json({ error: "create-order failed", detail: orderJson }, { status: 502 });
    }

    const orderID = orderJson?.id || orderJson?.orderID;
    if (!orderID || typeof orderID !== "string") {
      return NextResponse.json({ error: "Missing order id in PayPal response", detail: orderJson }, { status: 502 });
    }

    return NextResponse.json({ orderID });
  } catch (e: unknown) {
    console.error("create-order error:", errMsg(e));
    return NextResponse.json({ error: "internal_server_error", message: errMsg(e) }, { status: 500 });
  }
}
