// src/app/products/[handle]/page.tsx
import ProductDetail from "./ProductDetail";
import { getProductData } from "@/lib/shopify";

type Params = { handle: string };

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params; // ✅ di-await sesuai Next.js 15 typing

  try {
    const product = await getProductData(handle);

    if (!product) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">Product not found or server error</p>
        </div>
      );
    }

    return <ProductDetail product={product} />;
  } catch (error) {
    console.error("getProductData error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load product</p>
      </div>
    );
  }
}
