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

export default async function InvestingProjectPage({ params }: Props) {
  const { projectId } = await params;

  const project = investmentProjects.find(
    (item) => item.id === projectId
  );

  if (!project) {
    notFound();
  }

  const fundingPercentage =
    project.fundingTarget > 0
      ? Math.min(
        Math.round(
          (project.fundingCollected / project.fundingTarget) * 100
        ),
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
        <Link
          href="/investing"
          className="mb-8 inline-flex font-semibold text-teal-600 transition hover:text-teal-700"
        >
          ← Back to Investing
        </Link>

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

              <InfoItem
                label="Risk Level"
                value={project.riskLevel}
              />

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

        <section className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Use of Funds
          </h2>

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

        <section className="mt-8 rounded-3xl bg-teal-700 p-8 text-white">
          <h2 className="text-2xl font-bold">
            Interested in this project?
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-teal-50">
            Contact our team via WhatsApp for the project overview, quarterly agreement,
            documentation, and next steps. Profit sharing 8–10% above material costs.
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
                "- Quarterly agreement",
                "- Profit sharing 8–10%",
                "- Calculated above material / operational costs",
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
    </main>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
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
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className={`mt-3 text-2xl font-extrabold ${valueClassName}`}>
        {value}
      </p>
    </div>
  );
}
