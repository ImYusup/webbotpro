// src/app/products/[handle]/page.tsx
import ProductDetail from "./ProductDetail";
import { getProductData } from "@/lib/shopify";

export default async function ProductPage({ params }: { params: any }) {
  const { handle } = await params;

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
