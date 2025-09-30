// app/api/orders/[orderId]/capture/route.ts
// app/api/orders/[orderId]/capture/route.ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const orderId = url.pathname.split("/").at(-2); // Extract orderId from URL

  try {
    const body = await req.json();

    // TODO: capture order ke PayPal API
    console.log("Capturing order:", orderId, body);

    return Response.json({ success: true, orderId });
  } catch (err: any) {
    return Response.json(
      { error: err.message || "Failed to capture order" },
      { status: 500 }
    );
  }
}
