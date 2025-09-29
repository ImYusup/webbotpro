// src/app/api/activate-order/route.ts
import { NextResponse } from "next/server";
import { activateWhatsAppBot } from "@/lib/activation";
import { saveOrderToDB } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { orderID, payerEmail, productHandle } = body;

  if (!orderID || !payerEmail || !productHandle) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await saveOrderToDB({ orderID, payerEmail, productHandle });
    await activateWhatsAppBot(payerEmail, productHandle);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Activation error:", err);
    return NextResponse.json({ error: "Activation failed" }, { status: 500 });
  }
}
