// app/api/orders/[orderId]/capture/route.ts
// app/api/orders/[orderId]/capture/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  try {
    const body = await req.json();

    // TODO: capture order ke PayPal API
    console.log("Capturing order:", orderId, body);

    return NextResponse.json({ success: true, orderId });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to capture order" },
      { status: 500 }
    );
  }
}