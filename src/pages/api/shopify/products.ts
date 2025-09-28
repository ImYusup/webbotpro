import type { NextApiRequest, NextApiResponse } from "next";
import { shopifyFetch } from "@/lib/shopify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    res.status(200).json(data);
  } catch (err: any) {
    console.error("Shopify API Error:", err);
    res.status(500).json({ error: err.message });
  }
}
