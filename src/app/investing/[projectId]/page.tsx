// src/app/investing/[projectId]/page.tsx

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { investmentProjects } from "@/data/investing";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

// Data untuk sidebar (sama struktur dengan page.tsx)
const sidebarCategories = [
  {
    id: "trading",
    name: "Trading",
    projects: [
      { id: "trading-commodities", name: "Commodities" },
      { id: "trading-stocks", name: "Stocks" },
      { id: "trading-cryptocurrency", name: "Cryptocurrency" },
    ],
  },
  {
    id: "agriculture",
    name: "Agriculture / Farming",
    projects: [
      { id: "agriculture-rice-field", name: "Rice Field (Sawah)" },
      { id: "agriculture-broiler", name: "Broiler Chicken/Duck" },
      { id: "agriculture-layer", name: "Layer Chicken (Ayam Petelur)" },
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Creative",
    projects: [
      { id: "manufacturing-bags-luggage", name: "Bags & Luggage" },
      { id: "manufacturing-apparel-jersey", name: "Apparel & Jersey" },
      { id: "manufacturing-custom-merchandise", name: "Custom Merchandise" },
    ],
  },
  {
    id: "other",
    name: "Other Business Projects",
    projects: [
      { id: "other-construction-labor", name: "Construction Labor" },
      { id: "other-tender-procurement", name: "Tender & Procurement" },
      { id: "other-renovation-interior", name: "Renovation & Interior" },
    ],
  },
];

export default async function InvestingProjectPage({ params }: Props) {
  const { projectId } = await params;

  const project = investmentProjects.find((item) => item.id === projectId);

  if (!project) {
    notFound();
  }

  // Mapping category name → id untuk query param
  const categoryMap: Record<string, string> = {
    Trading: "trading",
    "Agriculture / Farming": "agriculture",
    "Manufacturing & Creative Products": "manufacturing",
    "Other Business Projects": "other",
  };

  const currentCategoryId = categoryMap[project.category] || "all";
  const currentCategoryName = project.category;

  const fundingPercentage =
    project.fundingTarget > 0
      ? Math.min(
        Math.round((project.fundingCollected / project.fundingTarget) * 100),
        100
      )
      : 0;

  const totalRevenue = project.financials.reduce(
    (total, item) => total + item.revenue,
    0
  );
  const totalProductionCost = project.financials.reduce(
    (total, item) => total + item.productionCost,
    0
  );
  const totalOperationalCost = project.financials.reduce(
    (total, item) => total + item.operationalCost,
    0
  );
  const totalNetProfit = project.financials.reduce(
    (total, item) => total + item.netProfit,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ========== TITLE (mengikuti kategori) ========== */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-black mb-3">
            {currentCategoryName}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join real projects with transparent profit sharing.
            Agreement periods and profit shares differ by category based on actual project results.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* ========== SIDEBAR ========== */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-2xl font-bold text-gray-900">
                Categories
              </h2>

              <nav className="flex flex-col gap-1">
                {/* All Opportunities */}
                <Link
                  href="/investing"
                  className="rounded-xl px-4 py-3 text-left font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  All Opportunities
                </Link>

                {/* Nested Categories */}
                {sidebarCategories.map((category) => (
                  <div key={category.id} className="mt-1">
                    {/* Category name - sekarang bisa diklik */}
                    <Link
                      href={`/investing?category=${category.id}`}
                      className={`block rounded-xl px-4 py-3 font-semibold transition ${currentCategoryId === category.id
                        ? "text-teal-700"
                        : "text-gray-800 hover:bg-gray-100"
                        }`}
                    >
                      {category.name}
                    </Link>

                    {/* Projects */}
                    <div className="ml-3 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                      {category.projects.map((p) => {
                        const isActive = p.id === projectId;
                        return (
                          <Link
                            key={p.id}
                            href={`/investing/${p.id}`}
                            className={`block rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive
                              ? "bg-teal-600 text-white"
                              : "text-gray-800 hover:bg-gray-100 hover:text-teal-700"
                              }`}
                          >
                            {p.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* ========== CONTENT ========== */}
          <div className="flex-1">
            {/* Header section */}
            <section className="grid gap-8 lg:grid-cols-2">
              <div className="relative min-h-[340px] overflow-hidden rounded-3xl bg-gray-200">
                <Image
                  src={project.image || "/placeholder.jpg"}
                  alt={project.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="rounded-3xl border bg-white p-8 shadow-sm">
                <div className="mb-5 flex flex-wrap gap-3">
                  <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
                    {project.category}
                  </span>
                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    {project.status}
                  </span>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900">
                  {project.name}
                </h1>

                <p className="mt-3 text-lg font-semibold text-gray-700">
                  {project.businessName}
                </p>

                <p className="mt-5 leading-7 text-gray-600">
                  {project.description}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6 border-t pt-6">
                  <InfoItem
                    label="Project Duration"
                    value={project.projectDuration}
                  />
                  <InfoItem label="Risk Level" value={project.riskLevel} />
                  <InfoItem
                    label="Minimum Investment"
                    value={formatRupiah(project.minimumInvestment)}
                  />
                  <InfoItem
                    label="Target Profit Sharing"
                    value={project.targetProfitSharing}
                  />
                </div>
              </div>
            </section>

            {/* Funding Progress */}
            <section className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-gray-500">
                    Funding Progress
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">
                    {formatRupiah(project.fundingCollected)}
                  </p>
                  <p className="mt-1 text-gray-500">
                    of {formatRupiah(project.fundingTarget)} target
                  </p>
                </div>
                <p className="text-3xl font-extrabold text-teal-600">
                  {fundingPercentage}%
                </p>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-teal-600 transition-all"
                  style={{ width: `${fundingPercentage}%` }}
                />
              </div>
            </section>

            {/* Business Performance */}
            <section className="mt-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Business Performance
                </h2>
                <p className="mt-2 text-gray-600">
                  Aggregate financial performance based on the latest project
                  reports.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  label="Total Revenue"
                  value={formatRupiah(totalRevenue)}
                />
                <MetricCard
                  label="Production Cost"
                  value={formatRupiah(totalProductionCost)}
                />
                <MetricCard
                  label="Operational Cost"
                  value={formatRupiah(totalOperationalCost)}
                />
                <MetricCard
                  label="Net Profit"
                  value={formatRupiah(totalNetProfit)}
                  valueClassName="text-green-600"
                />
              </div>
            </section>

            {/* Financial Reports */}
            <section className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm">
              <div className="border-b p-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Financial Reports
                </h2>
                <p className="mt-2 text-gray-600">
                  Project-level financial data presented in aggregate.
                </p>
              </div>

              {project.financials.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No financial reports available yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-gray-50">
                      <tr className="text-sm text-gray-600">
                        <th className="whitespace-nowrap px-6 py-4 font-semibold">
                          Period
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 font-semibold">
                          Revenue
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 font-semibold">
                          Production Cost
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 font-semibold">
                          Operational Cost
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 font-semibold">
                          Net Profit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {project.financials.map((financial) => (
                        <tr
                          key={financial.period}
                          className="text-sm text-gray-700"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">
                            {financial.period}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {formatRupiah(financial.revenue)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {formatRupiah(financial.productionCost)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {formatRupiah(financial.operationalCost)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-bold text-green-600">
                            {formatRupiah(financial.netProfit)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Use of Funds */}
            <section className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">Use of Funds</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.useOfFunds.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl bg-gray-50 px-5 py-4 text-gray-700"
                  >
                    <span className="mr-2 font-bold text-teal-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Project Updates */}
            <section className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">
                Project Updates
              </h2>

              {project.updates.length === 0 ? (
                <p className="mt-6 text-gray-500">
                  No public updates available yet.
                </p>
              ) : (
                <div className="mt-6 space-y-6">
                  {project.updates.map((update) => (
                    <article
                      key={`${update.date}-${update.title}`}
                      className="border-l-4 border-teal-500 pl-5"
                    >
                      <p className="text-sm font-medium text-gray-500">
                        {formatDate(update.date)}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-gray-900">
                        {update.title}
                      </h3>
                      <p className="mt-2 leading-7 text-gray-600">
                        {update.description}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* CTA */}
            <section className="mt-8 rounded-3xl bg-teal-700 p-8 text-white">
              <h2 className="text-2xl font-bold">
                Interested in this project?
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-teal-50">
                Contact our team via WhatsApp for the project overview,
                agreement details, documentation, and next steps. Profit
                sharing 40% Investor : 60% Operator (distributed proportionally).
              </p>
              <a
                href={`https://wa.me/6285975149508?text=${encodeURIComponent(
                  [
                    "Hello WebBotPro,",
                    "",
                    "I'm interested in this investment project:",
                    "",
                    `Project: ${project.name}`,
                    `Business: ${project.businessName}`,
                    "",
                    "Note:",
                    `- ${project.projectDuration} agreement`,
                    "- Profit sharing 40% Investor : 60% Operator",
                    "- Distributed proportionally based on capital share",
                    "",
                    "Could you please provide more details and next steps?",
                    "",
                    "Thank you!",
                  ].join("\n")
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-teal-700 transition hover:bg-teal-50"
              >
                Contact via WhatsApp
              </a>
            </section>

            <p className="mt-8 text-center text-sm leading-6 text-gray-500">
              Investment involves risk. Target profit sharing is based on actual
              project performance and is not guaranteed. Historical or projected
              performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  valueClassName = "text-gray-900",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p
        className={`mt-2 text-lg font-extrabold leading-tight break-all ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}