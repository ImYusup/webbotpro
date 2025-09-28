import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

export async function GET() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}