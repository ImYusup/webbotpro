// src/app/products/[id]/ProductDetail.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

type Product = {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  features?: string[];
};

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(product.discountPrice || product.price)
    .replace("IDR", "Rp");

  const originalPrice =
    product.discountPrice &&
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(product.price)
      .replace("IDR", "Rp");

  const waMessage = encodeURIComponent(`Hello WebBotPro,

I'm interested in:

Product : ${product.name}

Could you please provide more details?

Thank you!`);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="grid lg:grid-cols-2 gap-14">

          {/* LEFT */}
          <div>

            <div className="relative aspect-square rounded-3xl border bg-gray-50 overflow-hidden">
              <Image
                src={product.images?.[selectedImage] || "/placeholder.jpg"}
                alt={product.name}
                fill
                priority
                className="object-contain p-8"
              />
            </div>

            {product.images?.length > 1 && (
              <div className="flex gap-3 mt-5 overflow-x-auto">

                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? "border-teal-600"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="flex flex-col">

            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <div className="mt-6">

              {originalPrice && (
                <p className="text-xl text-gray-400 line-through">
                  {originalPrice}
                </p>
              )}

              <p className="text-5xl font-bold text-green-600">
                {price}
              </p>

            </div>

            <p className="mt-8 text-lg leading-8 text-gray-600">
              {product.description}
            </p>

            <div className="my-10 border-t" />

            <a
              href={`https://wa.me/6285975149508?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-2xl bg-teal-600 py-5 text-lg font-semibold text-white transition hover:bg-teal-700"
            >
              Contact via WhatsApp
            </a>

            <div className="mt-6 rounded-2xl bg-gray-50 p-6 border">

              <h3 className="font-bold text-gray-900 mb-3">
                Why choose WebBotPro?
              </h3>

              <ul className="space-y-2 text-sm text-gray-600">

                <li>✅ Professional implementation</li>
                <li>✅ Customizable to your business workflow</li>
                <li>✅ Source code included</li>
                <li>✅ Documentation provided</li>
                <li>✅ After-sales support</li>

              </ul>

            </div>

          </div>

        </div>

        {(product.features?.length ?? 0) > 0 && (
          <div className="mt-20 border-t pt-14">

            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Features
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              {product.features!.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border p-5 bg-white"
                >
                  <span className="text-green-600 text-lg">✔</span>

                  <span className="text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}