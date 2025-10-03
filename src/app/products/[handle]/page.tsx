// src/app/products/[handle]/page.tsx
import ProductDetail from "./ProductDetail";
import { getProductData } from "@/lib/shopify";

type Params = { handle: string };

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params;

  try {
    const product = await getProductData(handle);

    if (!product) {
      return (
        <main className="flex-1 flex items-center justify-center min-h-screen">
          <p className="text-red-500">Product not found or server error</p>
        </main>
      );
    }

    return (
      <main className="flex-1">
        <ProductDetail product={product} />
      </main>
    );
  } catch (error) {
    console.error("getProductData error:", error);
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load product</p>
      </main>
    );
  }
}
