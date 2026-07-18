// src/app/pricing/page.tsx
"use client";

import Link from "next/link";
import { pricingCategories, pricingData } from "@/data/pricingData";

export default function PricingPage() {
  const allPlans = Object.entries(pricingData).flatMap(
    ([categoryKey, category]) =>
      category.plans.map((plan) => ({
        ...plan,
        categoryKey,
        categoryTitle: category.title,
      }))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER CENTERED */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-black mb-3">
            Pricing Plans
          </h1>
          <p className="text-xl text-gray-600">
            Discover our premium digital solutions.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 rounded-3xl border bg-white p-8 shadow-sm">

              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Categories
              </h2>

              <nav className="flex flex-col gap-3">

                <Link
                  href="/pricing"
                  className="rounded-2xl bg-teal-600 px-6 py-3.5 font-semibold text-white"
                >
                  All Pricing
                </Link>

                {pricingCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/pricing/${category.id}`}
                    className="rounded-2xl px-6 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                ))}

              </nav>

            </div>
          </aside>

          {/* Pricing Cards */}
          <main className="flex-1">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {allPlans.map((plan, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-3xl border bg-white shadow-sm transition hover:shadow-xl"
                >
                  <div className="flex flex-1 flex-col p-8">

                    <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal-600">
                      {plan.categoryTitle}
                    </span>

                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
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

                    <p className="mb-6 flex-1 text-gray-600">
                      {plan.description}
                    </p>

                    <div className="border-t pt-6">

                      <Link
                        href={`/pricing/${plan.categoryKey}`}
                        className="font-semibold text-teal-600 transition hover:text-teal-700"
                      >
                        More Details →
                      </Link>

                    </div>

                  </div>
                </div>
              ))}

            </div>

          </main>

        </div>

      </div>
    </div>
  );
}