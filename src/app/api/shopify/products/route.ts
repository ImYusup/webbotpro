// src/app/api/shopify/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

export async function GET(req: NextRequest) {
  const query = `
    {
      products(first: 5) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Shopify API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ Required by Next.js App Router
export default { GET };
