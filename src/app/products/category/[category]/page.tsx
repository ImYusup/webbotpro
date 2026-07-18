// src/app/products/category/[category]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

type Props = {
  params: {
    category: string;
  };
};

export default async function ProductsCategoryPage({ params }: Props) {
  const { category } = params;

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

  const filteredProducts = products.filter(
    (p) => slugify(p.category ?? "") === category
  );

  if (filteredProducts.length === 0) {
    notFound();
  }

  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ] as string[];

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-black mb-3">
            {filteredProducts[0].category}
          </h1>

          <p className="text-xl text-gray-600">
            Discover our premium digital solutions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 rounded-3xl border bg-white p-8 shadow-sm">

              <h2 className="mb-6 text-2xl font-bold">
                Categories
              </h2>

              <nav className="flex flex-col gap-3">

                <Link
                  href="/products"
                  className="rounded-2xl px-6 py-3.5 font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  All Products
                </Link>

                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/products/category/${slugify(cat)}`}
                    className={`rounded-2xl px-6 py-3.5 font-semibold transition ${slugify(cat) === category
                        ? "bg-teal-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {cat}
                  </Link>
                ))}

              </nav>

            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

              {filteredProducts.map((product) => (

                <div
                  key={product.id}
                  className="bg-white border rounded-3xl shadow-sm hover:shadow-2xl transition-all overflow-hidden group flex flex-col h-full"
                >

                  <div className="relative h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">

                    <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                      {product.description}
                    </p>

                    <div className="mt-auto pt-4 border-t">

                      <p className="text-green-600 font-bold text-2xl mb-3">
                        {formatRupiah(product.discountPrice || product.price)}
                      </p>

                      <Link
                        href={`/products/${product.id}`}
                        className="text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-1"
                      >
                        View Product →
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}