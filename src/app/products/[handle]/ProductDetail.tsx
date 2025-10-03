// src/app/products/[handle]/ProductDetail.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PaypalLoader from "@/components/PaypalLoader";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useCart } from "@/lib/cart-store";

const PaypalButtonClientOnly = dynamic(() => import("@/components/PaypalButtonSDK"), { ssr: false });

type MediaNode =
  | {
    __typename: "MediaImage";
    id: string;
    image: { url: string; altText?: string | null };
  }
  | {
    __typename: "Video";
    id: string;
    sources: { url: string; mimeType?: string }[];
  };

export default function ProductDetail({ product }: { product: any }) {
  const { addItem } = useCart();

  const mediaEdges: { node: MediaNode }[] = product?.media?.edges || [];
  const mediaList = useMemo(() => mediaEdges.map((e) => e.node).filter(Boolean), [mediaEdges]);

  const defaultIndex = useMemo(() => {
    const vidIndex = mediaList.findIndex((m) => m.__typename === "Video");
    return vidIndex !== -1 ? vidIndex : mediaList.length ? 0 : -1;
  }, [mediaList]);

  const [selectedIndex, setSelectedIndex] = useState(defaultIndex === -1 ? 0 : defaultIndex);
  useEffect(() => {
    setSelectedIndex(defaultIndex === -1 ? 0 : defaultIndex);
  }, [defaultIndex]);

  const thumbContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollThumbIntoView = (i: number) => {
    const container = thumbContainerRef.current;
    if (!container) return;
    const child = container.children[i] as HTMLElement | undefined;

    if (child) {
      const scrollTo = Math.max(0, child.offsetLeft - (container.clientWidth - child.clientWidth) / 2);
      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0) scrollThumbIntoView(selectedIndex);
  }, [selectedIndex]);

  const [quantity, setQuantity] = useState(1);
  const variantNode = product?.variants?.edges?.[0]?.node;
  const fullVariantId = variantNode?.id;

  const handleAddToCart = () => {
    if (!fullVariantId) return;

    addItem({
      variantId: fullVariantId,
      title: product.title,
      price: Number(product?.priceRange?.minVariantPrice?.amount ?? 0),
      quantity,
      image:
        mediaList?.[0]?.__typename === "MediaImage"
          ? mediaList[0].image.url
          : undefined,
    });
  };

  const priceAmount = String(product?.priceRange?.minVariantPrice?.amount ?? "1.00");
  const currencyCode = product?.priceRange?.minVariantPrice?.currencyCode ?? "USD";
  const paypalKey = `paypal-${product?.handle}`;

  const paypalElement = useMemo(() => (
    <PaypalLoader currency={currencyCode}>
      <PaypalButtonClientOnly
        key={paypalKey}
        amount={priceAmount}
        currency={currencyCode}
        productHandle={product?.handle}
        quantity={quantity}
        variantId={fullVariantId}
        email={product?.vendor}
      />
    </PaypalLoader>
  ), [product?.handle, priceAmount, currencyCode, fullVariantId, product?.vendor]);

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Left: media */}
      <div>
        <div>
          {mediaList.length === 0 ? (
            <div className="w-full h-[360px] bg-gray-100 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">No media available</span>
            </div>
          ) : mediaList[selectedIndex].__typename === "Video" ? (
            <video controls className="w-full max-h-[560px] md:max-h-[640px] object-contain rounded-lg shadow-lg bg-black">
              <source src={mediaList[selectedIndex].sources[0].url} type={mediaList[selectedIndex].sources[0].mimeType || "video/mp4"} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={mediaList[selectedIndex].image.url}
              alt={mediaList[selectedIndex].image.altText || product.title}
              className="w-full max-h-[560px] md:max-h-[640px] object-contain rounded-lg shadow-lg"
            />
          )}
        </div>

        <div
          ref={thumbContainerRef}
          className="mt-4 flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300"
        >
          {mediaList.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 w-28 h-20 rounded overflow-hidden border ${i === selectedIndex ? "border-blue-500" : "border-gray-200"}`}
            >
              {m.__typename === "Video" ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              ) : (
                <img src={m.image.url} alt={m.image.altText || product.title} className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right: product info */}
      <div>
        <h1 className="text-3xl font-bold mb-3">{product.title}</h1>

        <div className="mb-4">
          {product.compareAtPriceRange?.minVariantPrice?.amount && (
            <p className="text-gray-400 line-through">
              {product.compareAtPriceRange.minVariantPrice.amount} {product.compareAtPriceRange.minVariantPrice.currencyCode}
            </p>
          )}
          <p className="text-2xl font-extrabold text-green-600">
            {product.priceRange?.minVariantPrice?.amount} {product.priceRange?.minVariantPrice?.currencyCode}
          </p>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 border rounded-md" aria-label="Decrease quantity">-</button>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            className="w-20 text-center border rounded-md px-2 py-1"
          />
          <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 border rounded-md" aria-label="Increase quantity">+</button>
        </div>

        {/* Buttons */}
        <div className="space-y-3 mb-6">
          <button onClick={handleAddToCart} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            Add to cart
          </button>
          <Suspense fallback={<div className="text-sm text-gray-400">Loading PayPal...</div>}>
            {paypalElement}
          </Suspense>
        </div>

        <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || "" }} />
      </div>
    </div>
  );
}
