// src/data/investing.ts

export type FinancialReport = {
  period: string;
  revenue: number;
  productionCost: number;
  operationalCost: number;
  netProfit: number;
};

export type ProjectUpdate = {
  date: string;
  title: string;
  description: string;
};

export type InvestmentProject = {
  id: string;
  name: string;
  businessName: string;
  category:
    | "Trading"
    | "Agriculture / Farming"
    | "Manufacturing & Creative Products"
    | "Other Business Projects";
  status: "Open for Funding" | "Funding Complete" | "In Progress" | "Completed";
  image: string;
  description: string;

  fundingTarget: number;
  fundingCollected: number;
  minimumInvestment: number;

  projectDuration: string;
  riskLevel: "Low" | "Medium" | "High";
  targetProfitSharing: string;

  useOfFunds: string[];
  financials: FinancialReport[];
  updates: ProjectUpdate[];
};

export const investmentCategories = [
  {
    id: "trading",
    name: "Trading",
    description:
      "Project-based trading activities with transparent performance reporting and risk disclosure.",
  },
  {
    id: "agriculture-farming",
    name: "Agriculture / Farming",
    description:
      "Agriculture and farming projects focused on productive assets, cultivation, and distribution.",
  },
  {
    id: "manufacturing-creative-products",
    name: "Manufacturing & Creative Products",
    description:
      "Production-based businesses such as bags, luggage, printing equipment, and creative products.",
  },
  {
    id: "other-business-projects",
    name: "Other Business Projects",
    description:
      "Selected business opportunities outside the primary investment categories.",
  },
];

export const investmentProjects: InvestmentProject[] = [
  {
    id: "gold-crypto-trading",
    name: "Gold & Crypto Trading Project",
    businessName: "WebBotPro Trading Division",
    category: "Trading",
    status: "Open for Funding",
    image: "/images/investing/trading-project.jpg",
    description:
      "A professionally managed trading project focused on gold and selected cryptocurrency markets. Project performance is reported using aggregate monthly results.",
    fundingTarget: 100000000,
    fundingCollected: 65000000,
    minimumInvestment: 5000000,
    projectDuration: "12 Months",
    riskLevel: "High",
    targetProfitSharing: "Based on actual project performance",
    useOfFunds: [
      "Trading capital allocation",
      "Risk management reserve",
      "Market analysis and monitoring",
      "Operational and reporting costs",
    ],
    financials: [
      {
        period: "January 2026",
        revenue: 18000000,
        productionCost: 0,
        operationalCost: 3500000,
        netProfit: 14500000,
      },
      {
        period: "February 2026",
        revenue: 21500000,
        productionCost: 0,
        operationalCost: 4000000,
        netProfit: 17500000,
      },
      {
        period: "March 2026",
        revenue: 16000000,
        productionCost: 0,
        operationalCost: 3200000,
        netProfit: 12800000,
      },
    ],
    updates: [
      {
        date: "2026-03-25",
        title: "Monthly trading report published",
        description:
          "The aggregate performance report for the latest period has been published for public review.",
      },
      {
        date: "2026-03-10",
        title: "Risk management review completed",
        description:
          "Trading exposure and risk controls were reviewed according to the project's internal procedures.",
      },
    ],
  },
  {
    id: "urban-farming-project",
    name: "Urban Farming Expansion",
    businessName: "FreshHarvest Agriculture",
    category: "Agriculture / Farming",
    status: "Open for Funding",
    image: "/images/investing/farming-project.jpg",
    description:
      "An urban farming project focused on expanding vegetable production and improving distribution to local businesses and households.",
    fundingTarget: 75000000,
    fundingCollected: 42000000,
    minimumInvestment: 2500000,
    projectDuration: "10 Months",
    riskLevel: "Medium",
    targetProfitSharing: "Based on actual project performance",
    useOfFunds: [
      "Seeds and farming materials",
      "Hydroponic equipment",
      "Packaging and distribution",
      "Farm maintenance and operations",
    ],
    financials: [
      {
        period: "January 2026",
        revenue: 12500000,
        productionCost: 5800000,
        operationalCost: 2200000,
        netProfit: 4500000,
      },
      {
        period: "February 2026",
        revenue: 14800000,
        productionCost: 6300000,
        operationalCost: 2400000,
        netProfit: 6100000,
      },
      {
        period: "March 2026",
        revenue: 16200000,
        productionCost: 6900000,
        operationalCost: 2500000,
        netProfit: 6800000,
      },
    ],
    updates: [
      {
        date: "2026-03-20",
        title: "Production capacity increased",
        description:
          "Additional growing racks have been installed to increase monthly production capacity.",
      },
      {
        date: "2026-02-15",
        title: "New distribution partnership",
        description:
          "The project started supplying products to additional local business customers.",
      },
    ],
  },
  {
    id: "solidbrand-production",
    name: "SolidBrand Production Expansion",
    businessName: "SolidBrand.id",
    category: "Manufacturing & Creative Products",
    status: "In Progress",
    image: "/images/investing/solidbrand-project.jpg",
    description:
      "A manufacturing expansion project for bags, luggage, and other creative products. Funding supports equipment, materials, and production capacity.",
    fundingTarget: 150000000,
    fundingCollected: 150000000,
    minimumInvestment: 10000000,
    projectDuration: "18 Months",
    riskLevel: "Medium",
    targetProfitSharing: "Based on actual project performance",
    useOfFunds: [
      "Printing and production equipment",
      "Raw materials",
      "Product development",
      "Packaging and distribution",
    ],
    financials: [
      {
        period: "January 2026",
        revenue: 38000000,
        productionCost: 21000000,
        operationalCost: 7500000,
        netProfit: 9500000,
      },
      {
        period: "February 2026",
        revenue: 42500000,
        productionCost: 23000000,
        operationalCost: 8000000,
        netProfit: 11500000,
      },
      {
        period: "March 2026",
        revenue: 48000000,
        productionCost: 25500000,
        operationalCost: 8500000,
        netProfit: 14000000,
      },
    ],
    updates: [
      {
        date: "2026-03-18",
        title: "New production equipment installed",
        description:
          "Additional production equipment has been installed to improve output and product consistency.",
      },
      {
        date: "2026-02-28",
        title: "New product line prepared",
        description:
          "The team completed preparation for a new creative product line.",
      },
    ],
  },
  {
    id: "digital-business-project",
    name: "Digital Business Development",
    businessName: "WebBotPro Digital Services",
    category: "Other Business Projects",
    status: "Open for Funding",
    image: "/images/investing/digital-business-project.jpg",
    description:
      "A digital business development project supporting automation services, website development, and business intelligence solutions for SMEs.",
    fundingTarget: 50000000,
    fundingCollected: 18000000,
    minimumInvestment: 2500000,
    projectDuration: "12 Months",
    riskLevel: "Medium",
    targetProfitSharing: "Based on actual project performance",
    useOfFunds: [
      "Product and service development",
      "Marketing and customer acquisition",
      "Server and software infrastructure",
      "Business operations",
    ],
    financials: [
      {
        period: "January 2026",
        revenue: 22000000,
        productionCost: 6500000,
        operationalCost: 8000000,
        netProfit: 7500000,
      },
      {
        period: "February 2026",
        revenue: 27500000,
        productionCost: 7200000,
        operationalCost: 8500000,
        netProfit: 11800000,
      },
      {
        period: "March 2026",
        revenue: 31000000,
        productionCost: 8000000,
        operationalCost: 9000000,
        netProfit: 14000000,
      },
    ],
    updates: [
      {
        date: "2026-03-22",
        title: "New business service launched",
        description:
          "A new business automation service was launched for small and medium-sized businesses.",
      },
      {
        date: "2026-02-12",
        title: "Customer acquisition campaign started",
        description:
          "The project began a focused campaign to acquire new business customers.",
      },
    ],
  },
];

export const getInvestmentProject = (projectId: string) => {
  return investmentProjects.find((project) => project.id === projectId);
};