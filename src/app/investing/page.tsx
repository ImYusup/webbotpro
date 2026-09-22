// src/app/investing/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const investmentCategories = [
  { id: "all", name: "All Opportunities" },
  { id: "trading", name: "Trading" },
  { id: "agriculture", name: "Agriculture / Farming" },
  { id: "manufacturing", name: "Manufacturing & Creative" },
  { id: "other", name: "Other Business Projects" },
];

const categoryPerformance = [
  {
    id: "trading",
    name: "Trading",
    totalProjects: 3,
    fundingCollected: 245000000,
    revenue: 580000000,
    netProfit: 113000000,
    performance: 19.5,
  },
  {
    id: "agriculture",
    name: "Agriculture",
    totalProjects: 3,
    fundingCollected: 230000000,
    revenue: 510000000,
    netProfit: 91000000,
    performance: 17.8,
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    totalProjects: 3,
    fundingCollected: 280000000,
    revenue: 720000000,
    netProfit: 116000000,
    performance: 16.1,
  },
  {
    id: "other",
    name: "Other Projects",
    totalProjects: 3,
    fundingCollected: 195000000,
    revenue: 430000000,
    netProfit: 61000000,
    performance: 14.2,
  },
];

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

const investmentPlans = [
  // ==================== TRADING ====================
  {
    id: "trading",
    projectId: "trading-commodities",
    name: "📦 Commodities",
    priceFrom: "Min. Rp 5.000.000",
    description:
      "Professionally managed commodities trading project with transparent performance reports every period.",
    features: [
      "Profit sharing 40% Investor : 60% Operator",
      "Quarterly agreement",
      "Regular performance reports",
      "Active risk management",
      "Minimum investment Rp 5–10 million",
    ],
    note: "Best for: investors ready for higher risk",
    agreementPeriod: "Quarterly agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
  {
    id: "trading",
    projectId: "trading-stocks",
    name: "📈 Stocks",
    priceFrom: "Min. Rp 8.000.000",
    description:
      "Equity trading project focused on selected stocks with structured risk management and reporting.",
    features: [
      "Profit sharing 40% Investor : 60% Operator",
      "Quarterly agreement",
      "Regular performance reports",
      "Active risk management",
      "Minimum investment Rp 5–10 million",
    ],
    note: "Best for: investors seeking equity exposure",
    agreementPeriod: "Quarterly agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
  {
    id: "trading",
    projectId: "trading-cryptocurrency",
    name: "₿ Cryptocurrency",
    priceFrom: "Min. Rp 10.000.000",
    description:
      "Managed cryptocurrency trading project focused on selected digital assets with clear risk controls.",
    features: [
      "Profit sharing 40% Investor : 60% Operator",
      "Quarterly agreement",
      "Regular performance reports",
      "Active risk management",
      "Minimum investment Rp 5–10 million",
    ],
    note: "Best for: investors comfortable with crypto volatility",
    agreementPeriod: "Quarterly agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
  // ==================== AGRICULTURE ====================
  {
    id: "agriculture",
    projectId: "agriculture-rice-field",
    name: "🌾 Rice Field (Sawah)",
    priceFrom: "Min. Rp 23.000.000",
    description:
      "Rice field farming project with profit sharing based on harvest results. Suitable for medium-term investment.",
    features: [
      "Profit sharing 40% Investor : 60% Operator",
      "6-month agreement",
      "Harvest-based returns",
      "Land & cultivation management",
      "Minimum investment according to project",
    ],
    note: "Best for: investors who prefer agricultural assets",
    agreementPeriod: "6-month agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
  {
    id: "agriculture",
    projectId: "agriculture-broiler",
    name: "🍗 Broiler Chicken/Duck (Ayam/Bebek Daging)",
    priceFrom: "Min. Rp 10.000.000",
    description:
      "Meat chicken and duck farming project with profit sharing based on livestock sales cycle.",
    features: [
      "Profit sharing 40% Investor : 60% Operator",
      "3-month agreement",
      "Livestock sales based returns",
      "Production monitoring",
      "Minimum investment according to project",
    ],
    note: "Best for: investors interested in livestock",
    agreementPeriod: "3-month agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
  {
    id: "agriculture",
    projectId: "agriculture-layer",
    name: "🥚 Layer Chicken (Ayam Petelur)",
    priceFrom: "Min. Rp 10.000.000",
    description:
      "Layer chicken farming project focused on egg production with monthly profit sharing cycle.",
    features: [
      "Profit sharing 40% Investor : 60% Operator",
      "3-month agreement",
      "Egg production based returns",
      "Regular production reports",
      "Minimum investment according to project",
    ],
    note: "Best for: investors who want shorter cycle",
    agreementPeriod: "3-month agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
  // ==================== MANUFACTURING ====================
  {
    id: "manufacturing",
    projectId: "manufacturing-bags-luggage",
    name: "👜 Bags & Luggage (Tas & Koper)",
    priceFrom: "Min. Rp 20.000.000",
    description:
      "Sublimation printing project for bags, luggage, pouches, and related products. Production partners support the printing capacity and receive profit sharing from verified production results.",
    features: [
      "Minimum investment: Rp 20 million",
      "Profit sharing: 40% Investor : 60% Operator",
      "Quarterly agreement",
      "Bags, luggage, and pouch production",
      "Production and sales monitoring",
      "Regular project performance reports",
      "Public transparency dashboard",
    ],
    note: "Best for: partners who want to support bags and luggage manufacturing.",
    agreementPeriod: "Per-piece or per-order production agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
  {
    id: "manufacturing",
    projectId: "manufacturing-apparel-jersey",
    name: "👕 Apparel & Jersey (Kaos & Jersey)",
    priceFrom: "Min. Rp 20.000.000",
    description:
      "Sublimation printing project for apparel, jerseys, hoodies, uniforms, and custom clothing. Production partners support the printing operation and participate in profit sharing based on actual orders.",
    features: [
      "Minimum investment: Rp 20 million",
      "Profit sharing: 40% Investor : 60% Operator",
      "Quarterly agreement",
      "Apparel, jersey, hoodie, and uniform production",
      "Suitable for team, school, community, and event orders",
      "Regular production and sales reports",
      "Public transparency dashboard",
    ],
    note: "Best for: partners interested in apparel and jersey production.",
    agreementPeriod: "Per-piece or per-order production agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
  {
    id: "manufacturing",
    projectId: "manufacturing-custom-merchandise",
    name: "🎁 Custom Merchandise (Print on Demand)",
    priceFrom: "Min. Rp 20.000.000",
    description:
      "Flexible print-on-demand project for custom merchandise, event apparel, community products, and branded items based on confirmed customer orders.",
    features: [
      "Minimum investment: Rp 20 million",
      "Profit sharing: 40% Investor : 60% Operator",
      "Quarterly agreement",
      "Custom and event-based production",
      "Flexible production cycle",
      "Order, material, and sales monitoring",
      "Public transparency dashboard",
    ],
    note: "Best for: partners who prefer flexible, order-based manufacturing projects.",
    agreementPeriod: "Per-order production agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
  // ==================== OTHER ====================
  {
    id: "other",
    projectId: "other-construction-labor",
    name: "🏗️ Construction Labor Projects",
    priceFrom: "Min. Rp 10.000.000",
    description:
      "Project-based funding for construction labor teams working on residential, commercial, and renovation projects with confirmed work orders.",
    features: [
      "Profit sharing 40% Investor : 60% Operator",
      "Distributed proportionally based on capital share",
      "Based on verified project profit",
      "Milestone-based monitoring",
      "Minimum investment according to project",

    ],
    note: "Best for: partners interested in construction and renovation projects.",
    agreementPeriod: "Per-project agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
  {
    id: "other",
    projectId: "other-tender-procurement",
    name: "📋 Tender & Procurement Projects",
    priceFrom: "Min. Rp 15.000.000",
    description:
      "Funding opportunity for selected tender and procurement projects involving goods, services, equipment, or operational supplies.",
    features: [
      "Profit sharing 40% Investor : 60% Operator",
      "Distributed proportionally based on capital share",
      "Based on verified project profit",
      "Milestone-based monitoring",
      "Minimum investment according to project",

    ],
    note: "Best for: partners who understand tender and procurement business risks.",
    agreementPeriod: "Per-tender or per-procurement agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
  {
    id: "other",
    projectId: "other-renovation-interior",
    name: "🛠️ Renovation & Interior Projects",
    priceFrom: "Min. Rp 20.000.000",
    description:
      "Project funding for home renovation, office refurbishment, interior work, and small-scale commercial improvement projects.",
    features: [
      "Profit sharing 40% Investor : 60% Operator",
      "Distributed proportionally based on capital share",
      "Based on verified project profit",
      "Milestone-based monitoring",
      "Minimum investment according to project",

    ],
    note: "Best for: partners interested in property improvement projects.",
    agreementPeriod: "Per-renovation project agreement",
    profitSharing: "40% Investor : 60% Operator",
  },
];

function InvestingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFromUrl = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl || "all"
  );

  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "trading",
    "agriculture",
    "manufacturing",
    "other",
  ]);

  // Sync state dengan URL
  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("all");
    }
  }, [categoryFromUrl]);

  const filteredPlans =
    activeCategory === "all"
      ? investmentPlans
      : investmentPlans.filter((plan) => plan.id === activeCategory);

  const currentTitle =
    activeCategory === "all"
      ? "Investing"
      : investmentCategories.find((c) => c.id === activeCategory)?.name ||
      "Investing";

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);

    if (categoryId === "all") {
      router.push("/investing");
    } else {
      router.push(`/investing?category=${categoryId}`);
    }

    // Auto expand kategori yang diklik
    if (categoryId !== "all" && !expandedCategories.includes(categoryId)) {
      setExpandedCategories((prev) => [...prev, categoryId]);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getWhatsAppLink = (
    planName: string,
    priceFrom: string,
    agreementPeriod: string = "Quarterly agreement",
    profitSharing: string = "40% Investor : 60% Operator",
  ) => {
    const cleanName = planName
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
      .replace(/\s+/g, " ")
      .trim();

    const text = [
      "Hello WebBotPro,",
      "",
      "I'm interested in Investing:",
      "",
      `Project: ${cleanName}`,
      `Minimum Investment: ${priceFrom}`,
      "",
      "Note:",
      `- ${agreementPeriod}`,
      `- Profit sharing ${profitSharing}`,
      "- Calculated above material / operational costs",
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
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-black mb-3">
            {currentTitle}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join real projects with transparent profit sharing. Agreement
            periods and profit shares differ by category based on actual project
            results.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar - Nested */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-2xl font-bold text-gray-900">
                Categories
              </h2>

              <nav className="flex flex-col gap-1">
                {/* All Opportunities */}
                <button
                  onClick={() => handleCategoryClick("all")}
                  className={`rounded-xl px-4 py-3 text-left font-semibold transition ${activeCategory === "all"
                    ? "bg-teal-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  All Opportunities
                </button>

                {/* Nested Categories */}
                {investmentCategories
                  .filter((cat) => cat.id !== "all")
                  .map((category) => {
                    const isExpanded = expandedCategories.includes(category.id);
                    const isActive = activeCategory === category.id;
                    const projects = investmentPlans.filter(
                      (p) => p.id === category.id
                    );

                    return (
                      <div key={category.id} className="mt-1">
                        {/* Category Header */}
                        <button
                          onClick={() => handleCategoryClick(category.id)}
                          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold transition ${isActive
                            ? "bg-teal-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                          <span>{category.name}</span>
                          <span
                            className={`text-sm transition-transform ${isExpanded ? "rotate-180" : ""
                              }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCategory(category.id);
                            }}
                          >
                            ▾
                          </span>
                        </button>

                        {/* Nested Projects */}
                        {isExpanded && (
                          <div className="ml-3 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                            {projects.map((project) => (
                              <Link
                                key={project.projectId}
                                href={`/investing/${project.projectId}`}
                                className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 hover:text-teal-700"
                              >
                                {project.name
                                  .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
                                  .trim()}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {/* Dashboard hanya tampil saat All Opportunities */}
            {activeCategory === "all" && (
              <div className="mb-10 space-y-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">Active Projects</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {categoryPerformance.reduce(
                        (total, category) => total + category.totalProjects,
                        0
                      )}
                    </p>
                  </div>
                  <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">Total Funding</p>
                    <p className="mt-2 text-xl font-bold text-teal-600">
                      {formatRupiah(
                        categoryPerformance.reduce(
                          (total, category) =>
                            total + category.fundingCollected,
                          0
                        )
                      )}
                    </p>
                  </div>
                  <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="mt-2 text-xl font-bold text-blue-600">
                      {formatRupiah(
                        categoryPerformance.reduce(
                          (total, category) => total + category.revenue,
                          0
                        )
                      )}
                    </p>
                  </div>
                  <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">Verified Net Profit</p>
                    <p className="mt-2 text-xl font-bold text-green-600">
                      {formatRupiah(
                        categoryPerformance.reduce(
                          (total, category) => total + category.netProfit,
                          0
                        )
                      )}
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Performance by Category
                  </h2>
                  <p className="mb-6 text-sm text-gray-500">
                    Comparison of revenue and verified net profit across
                    categories.
                  </p>
                  <div className="h-[360px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryPerformance}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis
                          tickFormatter={(value) =>
                            `${Math.round(value / 1000000)}M`
                          }
                        />
                        <Tooltip
                          formatter={(value) => formatRupiah(Number(value))}
                        />
                        <Legend />
                        <Bar
                          dataKey="revenue"
                          name="Revenue"
                          fill="#3b82f6"
                          radius={[8, 8, 0, 0]}
                        />
                        <Bar
                          dataKey="netProfit"
                          name="Net Profit"
                          fill="#10b981"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Ranking */}
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                  <h2 className="mb-5 text-2xl font-bold text-gray-900">
                    Category Performance Ranking
                  </h2>
                  <div className="space-y-4">
                    {[...categoryPerformance]
                      .sort((a, b) => b.performance - a.performance)
                      .map((category, index) => (
                        <div
                          key={category.id}
                          className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                        >
                          <div className="flex items-center gap-4">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {category.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {category.totalProjects} active projects
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">
                              {category.performance.toFixed(1)}%
                            </p>
                            <p className="text-xs text-gray-500">
                              Net profit margin
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Investment Cards */}
            {filteredPlans.length === 0 ? (
              <p className="py-20 text-center text-gray-500">
                No projects found in this category.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredPlans.map((plan, index) => (
                  <div
                    key={`${plan.id}-${index}`}
                    className="flex h-full flex-col rounded-3xl border bg-white p-7 shadow-lg transition-all hover:shadow-xl"
                  >
                    <Link href={`/investing/${plan.projectId}`}>
                      <h3 className="text-xl font-bold text-gray-900 leading-snug mb-2 hover:text-teal-600 transition">
                        {plan.name}
                      </h3>
                    </Link>

                    <p className="text-teal-600 font-semibold text-[15px] mb-4">
                      {plan.priceFrom}
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                      {plan.description}
                    </p>

                    <ul className="space-y-2.5 mb-5 flex-1">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-gray-700"
                        >
                          <span className="mt-0.5 text-teal-500 font-bold">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.note && (
                      <p className="text-sm font-medium text-orange-500 mb-6">
                        {plan.note}
                      </p>
                    )}

                    <a
                      href={getWhatsAppLink(
                        plan.name,
                        plan.priceFrom,
                        plan.agreementPeriod || "Quarterly agreement",
                        plan.profitSharing || "40% Investor : 60% Operator",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                      Inquire via WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Disclaimer */}
            <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-gray-500">
              Investment involves risk. Reported figures are historical or
              current project performance indicators and are not guaranteed.
              Profit sharing depends on verified business results and actual
              project performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InvestingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    }>
      <InvestingContent />
    </Suspense>
  );
}