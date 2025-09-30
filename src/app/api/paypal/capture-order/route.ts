// src/app/api/paypal/capture-order/route.ts
import { NextResponse } from "next/server";

const PAYPAL_MODE = (process.env.PAYPAL_MODE || "sandbox").toLowerCase();
const PAYPAL_BASE =
  PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getTokenServerSide() {
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

  const j = await res.json().catch(() => null);
  if (!res.ok || !j?.access_token) {
    throw new Error("Failed to fetch PayPal token");
  }
  return j.access_token as string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const orderID = body?.orderID || body?.id;
    if (!orderID) {
      return NextResponse.json(
        { ok: false, error: "missing orderID" },
        { status: 400 }
      );
    }

    const token = await getTokenServerSide();

    const capRes = await fetch(
      `${PAYPAL_BASE}/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const capJson = await capRes.json().catch(() => null);

    if (!capRes.ok) {
      return NextResponse.json(
        { ok: false, error: "paypal capture failed", detail: capJson },
        { status: 502 }
      );
    }

    const captureObj =
      capJson.purchase_units?.[0]?.payments?.captures?.[0] ?? null;

    return NextResponse.json({
      ok: true,
      captureId: captureObj?.id,
      status: captureObj?.status,
      amount: captureObj?.amount?.value,
      currency: captureObj?.amount?.currency_code,
      payer: capJson?.payer ?? null,
      full: capJson, // optional, bisa lu hapus kalau gak mau lempar semua
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e) },
      { status: 500 }
    );
  }
}
