// app/api/orders/[orderId]/capture/route.ts
import { NextRequest } from "next/server";

const PAYPAL_MODE = (process.env.PAYPAL_MODE || "sandbox").toLowerCase();
const PAYPAL_BASE = PAYPAL_MODE === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function fetchPayPalToken(): Promise<string> {
  const client = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!client || !secret) throw new Error("Missing PayPal credentials");

  const basic = Buffer.from(`${client}:${secret}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.access_token) {
    throw new Error("Failed to fetch PayPal token");
  }

  return json.access_token;
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const orderId = url.pathname.split("/").at(-2);

  try {
    const token = await fetchPayPalToken();

    const captureRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const captureJson = await captureRes.json();

    if (!captureRes.ok) {
      return Response.json({ ok: false, error: "paypal capture failed", detail: captureJson }, { status: 502 });
    }

    return Response.json({ ok: true, capture: captureJson });
  } catch (err: any) {
    return Response.json({ ok: false, error: err.message || "internal_error" }, { status: 500 });
  }
}

