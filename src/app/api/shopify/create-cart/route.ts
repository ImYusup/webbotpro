// src/app/apishopify/create-cart/route.tsx
import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN!;

export async function POST(req: Request) {
  try {
    if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
      console.error("❌ Missing Shopify credentials");
      return NextResponse.json({ error: "Shopify config missing" }, { status: 500 });
    }

    const body = await req.json();
    const items = body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      console.error("❌ No items provided in request body");
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    console.log("📦 Incoming items:", JSON.stringify(items, null, 2));

    const lines = items.map((item: any) => {
      const id = item.variantId || item.handle;
      if (!id || typeof id !== "string") {
        throw new Error(`Invalid variant ID: ${JSON.stringify(item)}`);
      }
      return {
        quantity: item.quantity,
        merchandiseId: id,
      };
    });

    const query = `
      mutation cartCreate($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart {
            id
            checkoutUrl
          }
        }
      }
    `;

    const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables: { lines } }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Shopify fetch failed:", res.status, res.statusText, text);
      return NextResponse.json({ error: "Shopify fetch failed" }, { status: 500 });
    }

    const json = await res.json();
    const checkoutUrl = json?.data?.cartCreate?.cart?.checkoutUrl;

    if (!checkoutUrl) {
      console.error("❌ Shopify response missing checkoutUrl:", JSON.stringify(json, null, 2));
      return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("❌ Internal error in create-cart route:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}