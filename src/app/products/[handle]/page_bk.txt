// src/app/products/[handle]/page.tsx
import ProductDetail from "./ProductDetail";
import { getProductData } from "@/lib/shopify";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type Params = { handle: string };

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params; // ✅ Next.js 15 typing fix

  try {
    const product = await getProductData(handle);

    if (!product) {
      return (
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <p className="text-red-500">Product not found or server error</p>
          </main>
          <Footer />
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <ProductDetail product={product} />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("getProductData error:", error);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-red-500">Failed to load product</p>
        </main>
        <Footer />
      </div>
    );
  }
}
