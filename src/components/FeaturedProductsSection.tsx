// src/components/FeaturedProductsSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function FeaturedProductsSection() {
  return (
    <section id="products" className="pt-16 pb-8 bg-gray-50">   {/* ← pb-8 dikurangi */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full group"
            >
              <div className="relative h-64 bg-gray-50 rounded-xl overflow-hidden mb-5 flex items-center justify-center border border-gray-100">
                <Image
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-xl leading-tight mb-3 text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto">
                <p className="text-green-600 font-bold text-2xl mb-4">
                  {formatRupiah(product.discountPrice || product.price)}
                </p>

                <Link
                  href={`/products/${product.id}`}
                  className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors group-hover:gap-1"
                >
                  View Product 
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-block bg-teal-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-teal-700 transition-colors"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}