// src/app/product/[id]/page.tsx

import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetail from "@/components/ProductDetail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}