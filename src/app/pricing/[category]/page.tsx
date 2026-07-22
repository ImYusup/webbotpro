// src/app/pricing/[category]/page.tsx
"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pricingData, pricingCategories } from "@/data/pricingData";

type Props = {
  params: Promise<{ category: string }>;
};

export default function PricingCategoryPage({ params }: Props) {
  const { category } = use(params);

  const data = pricingData[category as keyof typeof pricingData];

  if (!data) notFound();

  // Helper
  const cleanPlanName = (name: string) =>
    name.replace(/[^\p{L}\p{N}\s]/gu, "").trim();

  const getWhatsAppLink = (
    planName: string,
    priceFrom: string,
    priceTo?: string
  ) => {
    const packageName = cleanPlanName(planName);

    const priceRange = priceTo
      ? `${priceFrom} ${priceTo}`
      : priceFrom;

    const isLiveCommerce = category === "live-commerce";

    const text = [
      "Hello WebBotPro,",
      "",
      "I'm interested in:",
      "",
      `Package: ${packageName}`,
      `Price Range: ${priceRange}`,
      `Category: ${data.title}`,
      "",
      "Note:",
      ...(isLiveCommerce
        ? [
          "- This is a booking service.",
          "- Schedule is subject to availability.",
          "- Please let me know the available time slots.",
        ]
        : [
          "- This is a pre-order service.",
          "- Minimum 70% DP is required.",
          "- Development starts after payment.",
          "- Estimated completion: 3-5 business days.",
        ]),
      "",
      "Could you please provide more details and next steps?",
      "",
      "Thank you!",
    ].join("\n");

    return `https://wa.me/6285975149508?text=${encodeURIComponent(text)}`;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 rounded-3xl border bg-white p-8 shadow-sm">

              <h2 className="text-2xl font-bold mb-6">
                Categories
              </h2>

              <nav className="flex flex-col gap-3">

                <Link
                  href="/pricing"
                  className={`rounded-2xl px-6 py-3.5 font-semibold transition ${category === undefined
                    ? "bg-teal-600 text-white"
                    : "hover:bg-gray-100"
                    }`}
                >
                  All Pricing
                </Link>

                {pricingCategories.map((item) => (
                  <Link
                    key={item.id}
                    href={`/pricing/${item.id}`}
                    className={`rounded-2xl px-6 py-3.5 font-semibold transition ${item.id === category
                      ? "bg-teal-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}

              </nav>

            </div>
          </aside>

          {/* Content */}
          <main className="flex-1">

            <div className="mb-12 text-center">
              <h1 className="text-5xl font-bold text-gray-900">
                {data.title}
              </h1>

              <p className="mt-4 text-lg text-gray-600">
                Explore our available packages and choose the one that fits your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {data.plans.map((plan, i) => (
                <div
                  key={i}
                  className="flex h-full flex-col rounded-3xl border bg-card p-8 shadow-lg transition-all hover:shadow-xl"
                >
                  <h2 className="mb-6 text-2xl font-bold text-foreground">
                    {plan.name}
                  </h2>

                  <div className="mb-6 min-h-[60px]">
                    <div className="text-[28px] font-bold leading-tight text-primary">
                      <span>Rp </span>
                      <span>{plan.priceFrom.replace("Rp ", "")}</span>

                      {plan.priceTo && (
                        <>
                          <span className="mx-2 text-gray-400">—</span>
                          <span>{plan.priceTo.replace("Rp ", "")}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="mb-6 text-sm text-muted-foreground">
                    {plan.description}
                  </p>

                  <ul className="mb-8 flex-1 space-y-3 text-sm">
                    {plan.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 text-green-500">✔</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.note && (
                    <p className="mb-4 text-xs text-muted-foreground">
                      {plan.note}
                    </p>
                  )}

                  {plan.preOrderNote && (
                    <p className="mb-6 border-t pt-4 text-xs font-medium text-amber-600">
                      {plan.preOrderNote}
                    </p>
                  )}

                  <Link
                    href={getWhatsAppLink(plan.name, plan.priceFrom, plan.priceTo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"                  >
                    Contact via WhatsApp
                  </Link>
                </div>
              ))}

            </div>

          </main>

        </div>

      </div >
    </div >
  );
}