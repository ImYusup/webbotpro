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
  // ==================== TRADING ====================
  {
    id: "trading-commodities",
    name: "Commodities Trading Project",
    businessName: "WebBotPro Trading Division",
    category: "Trading",
    status: "Open for Funding",
    image: "/images/investing/trading-commodities.jpg",
    description:
      "Professionally managed commodities trading project with transparent performance reports every period.",
    fundingTarget: 150000000,
    fundingCollected: 85000000,
    minimumInvestment: 5000000,
    projectDuration: "Quarterly",
    riskLevel: "High",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Trading capital allocation",
      "Risk management reserve",
      "Market analysis and monitoring",
      "Operational and reporting costs",
    ],
    financials: [
      {
        period: "Q3 2025",
        revenue: 52000000,
        productionCost: 0,
        operationalCost: 12000000,
        netProfit: 9800000,
      },
      {
        period: "Q4 2025",
        revenue: 68000000,
        productionCost: 0,
        operationalCost: 14500000,
        netProfit: 13200000,
      },
      {
        period: "Q1 2026",
        revenue: 75000000,
        productionCost: 0,
        operationalCost: 15800000,
        netProfit: 15100000,
      },
      {
        period: "Q2 2026",
        revenue: 82000000,
        productionCost: 0,
        operationalCost: 16500000,
        netProfit: 16800000,
      },
    ],
    updates: [],
  },
  {
    id: "trading-stocks",
    name: "Stocks Trading Project",
    businessName: "WebBotPro Trading Division",
    category: "Trading",
    status: "Open for Funding",
    image: "/images/investing/trading-stocks.jpg",
    description:
      "Equity trading project focused on selected stocks with structured risk management and reporting.",
    fundingTarget: 200000000,
    fundingCollected: 110000000,
    minimumInvestment: 8000000,
    projectDuration: "Quarterly",
    riskLevel: "High",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Equity trading capital",
      "Risk management reserve",
      "Market research",
      "Operational and reporting costs",
    ],
    // trading-stocks
    financials: [
      {
        period: "Q3 2025",
        revenue: 61000000,
        productionCost: 0,
        operationalCost: 13500000,
        netProfit: 11200000,
      },
      {
        period: "Q4 2025",
        revenue: 78000000,
        productionCost: 0,
        operationalCost: 16200000,
        netProfit: 14800000,
      },
      {
        period: "Q1 2026",
        revenue: 89000000,
        productionCost: 0,
        operationalCost: 17500000,
        netProfit: 17200000,
      },
      {
        period: "Q2 2026",
        revenue: 95000000,
        productionCost: 0,
        operationalCost: 18200000,
        netProfit: 18500000,
      },
    ],
    updates: [],
  },
  {
    id: "trading-cryptocurrency",
    name: "Cryptocurrency Trading Project",
    businessName: "WebBotPro Trading Division",
    category: "Trading",
    status: "Open for Funding",
    image: "/images/investing/trading-crypto.jpg",
    description:
      "Managed cryptocurrency trading project focused on selected digital assets with clear risk controls.",
    fundingTarget: 180000000,
    fundingCollected: 95000000,
    minimumInvestment: 10000000,
    projectDuration: "Quarterly",
    riskLevel: "High",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Crypto trading capital",
      "Risk management reserve",
      "Market monitoring tools",
      "Operational and reporting costs",
    ],
    // trading-cryptocurrency
    financials: [
      {
        period: "Q3 2025",
        revenue: 48000000,
        productionCost: 0,
        operationalCost: 11000000,
        netProfit: 8900000,
      },
      {
        period: "Q4 2025",
        revenue: 72000000,
        productionCost: 0,
        operationalCost: 14800000,
        netProfit: 13800000,
      },
      {
        period: "Q1 2026",
        revenue: 85000000,
        productionCost: 0,
        operationalCost: 16000000,
        netProfit: 16500000,
      },
      {
        period: "Q2 2026",
        revenue: 98000000,
        productionCost: 0,
        operationalCost: 17800000,
        netProfit: 19200000,
      },
    ],
    updates: [],
  },

  // ==================== AGRICULTURE ====================
  {
    id: "agriculture-rice-field",
    name: "Rice Field (Sawah) Farming Project",
    businessName: "WebBotPro Agriculture",
    category: "Agriculture / Farming",
    status: "Open for Funding",
    image: "/images/investing/agriculture-sawah.jpg",
    description:
      "Rice field farming project with profit sharing based on harvest results. Suitable for medium-term investment.",
    fundingTarget: 230000000,
    fundingCollected: 120000000,
    minimumInvestment: 23000000,
    projectDuration: "6 Months",
    riskLevel: "Medium",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Land preparation",
      "Seeds and fertilizers",
      "Cultivation management",
      "Harvest and distribution",
    ],
    // agriculture-rice-field
    financials: [
      {
        period: "Harvest 2025 (Season 1)",
        revenue: 95000000,
        productionCost: 42000000,
        operationalCost: 18000000,
        netProfit: 28000000,
      },
      {
        period: "Harvest 2025 (Season 2)",
        revenue: 110000000,
        productionCost: 48000000,
        operationalCost: 19500000,
        netProfit: 32500000,
      },
      {
        period: "Harvest 2026 (Season 1)",
        revenue: 125000000,
        productionCost: 52000000,
        operationalCost: 21000000,
        netProfit: 38000000,
      },
    ],
    updates: [],
  },
  {
    id: "agriculture-broiler",
    name: "Broiler Chicken / Duck Farming Project",
    businessName: "WebBotPro Agriculture",
    category: "Agriculture / Farming",
    status: "Open for Funding",
    image: "/images/investing/agriculture-broiler.jpg",
    description:
      "Meat chicken and duck farming project with profit sharing based on livestock sales cycle.",
    fundingTarget: 120000000,
    fundingCollected: 70000000,
    minimumInvestment: 10000000,
    projectDuration: "3 Months",
    riskLevel: "Medium",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Livestock purchase",
      "Feed and medicine",
      "Farm facilities",
      "Production monitoring",
    ],
    // agriculture-broiler
    financials: [
      {
        period: "Cycle 3 2025",
        revenue: 48000000,
        productionCost: 28000000,
        operationalCost: 6500000,
        netProfit: 9800000,
      },
      {
        period: "Cycle 4 2025",
        revenue: 55000000,
        productionCost: 31000000,
        operationalCost: 7200000,
        netProfit: 11800000,
      },
      {
        period: "Cycle 1 2026",
        revenue: 62000000,
        productionCost: 34000000,
        operationalCost: 7800000,
        netProfit: 14200000,
      },
      {
        period: "Cycle 2 2026",
        revenue: 68000000,
        productionCost: 36500000,
        operationalCost: 8500000,
        netProfit: 16200000,
      },
    ],
    updates: [],
  },
  {
    id: "agriculture-layer",
    name: "Layer Chicken (Ayam Petelur) Farming Project",
    businessName: "WebBotPro Agriculture",
    category: "Agriculture / Farming",
    status: "Open for Funding",
    image: "/images/investing/agriculture-layer.jpg",
    description:
      "Layer chicken farming project focused on egg production with monthly profit sharing cycle.",
    fundingTarget: 100000000,
    fundingCollected: 55000000,
    minimumInvestment: 10000000,
    projectDuration: "3 Months",
    riskLevel: "Medium",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Layer chicken stock",
      "Feed and supplements",
      "Cage maintenance",
      "Egg production monitoring",
    ],
    // agriculture-layer
    financials: [
      {
        period: "Q3 2025",
        revenue: 52000000,
        productionCost: 27500000,
        operationalCost: 9500000,
        netProfit: 12000000,
      },
      {
        period: "Q4 2025",
        revenue: 61000000,
        productionCost: 31000000,
        operationalCost: 10800000,
        netProfit: 15200000,
      },
      {
        period: "Q1 2026",
        revenue: 68000000,
        productionCost: 34000000,
        operationalCost: 11800000,
        netProfit: 17200000,
      },
      {
        period: "Q2 2026",
        revenue: 75000000,
        productionCost: 36500000,
        operationalCost: 12500000,
        netProfit: 19500000,
      },
    ],
    updates: [],
  },

  // ==================== MANUFACTURING ====================
  {
    id: "manufacturing-bags-luggage",
    name: "Bags & Luggage Production Project",
    businessName: "SolidBrand.id",
    category: "Manufacturing & Creative Products",
    status: "Open for Funding",
    image: "/images/investing/manufacturing-bags.jpg",
    description:
      "Sublimation printing project for bags, luggage, pouches, and related products. Production partners support the printing capacity and receive profit sharing from verified production results.",
    fundingTarget: 250000000,
    fundingCollected: 140000000,
    minimumInvestment: 20000000,
    projectDuration: "Per Order",
    riskLevel: "Medium",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Raw materials",
      "Printing equipment",
      "Production operations",
      "Packaging and delivery",
    ],
    // manufacturing-bags-luggage
    financials: [
      {
        period: "Q3 2025",
        revenue: 78000000,
        productionCost: 42000000,
        operationalCost: 12500000,
        netProfit: 18500000,
      },
      {
        period: "Q4 2025",
        revenue: 95000000,
        productionCost: 51000000,
        operationalCost: 14800000,
        netProfit: 23200000,
      },
      {
        period: "Q1 2026",
        revenue: 110000000,
        productionCost: 58000000,
        operationalCost: 16500000,
        netProfit: 27500000,
      },
      {
        period: "Q2 2026",
        revenue: 125000000,
        productionCost: 65000000,
        operationalCost: 18200000,
        netProfit: 31800000,
      },
    ],
    updates: [],
  },
  {
    id: "manufacturing-apparel-jersey",
    name: "Apparel & Jersey Production Project",
    businessName: "SolidBrand.id",
    category: "Manufacturing & Creative Products",
    status: "Open for Funding",
    image: "/images/investing/manufacturing-apparel.jpg",
    description:
      "Sublimation printing project for apparel, jerseys, hoodies, uniforms, and custom clothing. Production partners support the printing operation and participate in profit sharing based on actual orders.",
    fundingTarget: 250000000,
    fundingCollected: 130000000,
    minimumInvestment: 20000000,
    projectDuration: "Per Order",
    riskLevel: "Medium",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Fabric and materials",
      "Printing equipment",
      "Production operations",
      "Order fulfillment",
    ],
    // manufacturing-apparel-jersey
    financials: [
      {
        period: "Q3 2025",
        revenue: 72000000,
        productionCost: 39000000,
        operationalCost: 11800000,
        netProfit: 16800000,
      },
      {
        period: "Q4 2025",
        revenue: 88000000,
        productionCost: 47000000,
        operationalCost: 14200000,
        netProfit: 21800000,
      },
      {
        period: "Q1 2026",
        revenue: 105000000,
        productionCost: 55000000,
        operationalCost: 15800000,
        netProfit: 26200000,
      },
      {
        period: "Q2 2026",
        revenue: 118000000,
        productionCost: 61000000,
        operationalCost: 17200000,
        netProfit: 29800000,
      },
    ],
    updates: [],
  },
  {
    id: "manufacturing-custom-merchandise",
    name: "Custom Merchandise (Print on Demand)",
    businessName: "SolidBrand.id",
    category: "Manufacturing & Creative Products",
    status: "Open for Funding",
    image: "/images/investing/manufacturing-merchandise.jpg",
    description:
      "Flexible print-on-demand project for custom merchandise, event apparel, community products, and branded items based on confirmed customer orders.",
    fundingTarget: 200000000,
    fundingCollected: 100000000,
    minimumInvestment: 20000000,
    projectDuration: "Per Order",
    riskLevel: "Medium",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Materials and blanks",
      "Printing capacity",
      "Order processing",
      "Packaging and shipping",
    ],
    // manufacturing-custom-merchandise
    financials: [
      {
        period: "Q3 2025",
        revenue: 55000000,
        productionCost: 30000000,
        operationalCost: 9500000,
        netProfit: 12500000,
      },
      {
        period: "Q4 2025",
        revenue: 68000000,
        productionCost: 36000000,
        operationalCost: 11200000,
        netProfit: 15800000,
      },
      {
        period: "Q1 2026",
        revenue: 82000000,
        productionCost: 43000000,
        operationalCost: 13000000,
        netProfit: 19500000,
      },
      {
        period: "Q2 2026",
        revenue: 95000000,
        productionCost: 49000000,
        operationalCost: 14500000,
        netProfit: 23000000,
      },
    ],
    updates: [],
  },

  // ==================== OTHER ====================
  {
    id: "other-construction-labor",
    name: "Construction Labor Projects",
    businessName: "WebBotPro Projects",
    category: "Other Business Projects",
    status: "Open for Funding",
    image: "/images/investing/other-construction.jpg",
    description:
      "Project-based funding for construction labor teams working on residential, commercial, and renovation projects with confirmed work orders.",
    fundingTarget: 150000000,
    fundingCollected: 80000000,
    minimumInvestment: 10000000,
    projectDuration: "Per Project",
    riskLevel: "Medium",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Labor funding",
      "Operational costs",
      "Transportation",
      "Project monitoring",
    ],
    // other-construction-labor
    financials: [
      {
        period: "Project Batch A 2025",
        revenue: 65000000,
        productionCost: 38000000,
        operationalCost: 9500000,
        netProfit: 13500000,
      },
      {
        period: "Project Batch B 2025",
        revenue: 78000000,
        productionCost: 45000000,
        operationalCost: 11000000,
        netProfit: 16500000,
      },
      {
        period: "Project Batch A 2026",
        revenue: 88000000,
        productionCost: 50000000,
        operationalCost: 12500000,
        netProfit: 19500000,
      },
      {
        period: "Project Batch B 2026",
        revenue: 95000000,
        productionCost: 54000000,
        operationalCost: 13800000,
        netProfit: 21200000,
      },
    ],
    updates: [],
  },
  {
    id: "other-tender-procurement",
    name: "Tender & Procurement Projects",
    businessName: "WebBotPro Projects",
    category: "Other Business Projects",
    status: "Open for Funding",
    image: "/images/investing/other-tender.jpg",
    description:
      "Funding opportunity for selected tender and procurement projects involving goods, services, equipment, or operational supplies.",
    fundingTarget: 180000000,
    fundingCollected: 90000000,
    minimumInvestment: 15000000,
    projectDuration: "Per Tender",
    riskLevel: "Medium",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Working capital",
      "Procurement of goods/services",
      "Delivery and logistics",
      "Project administration",
    ],
    // other-tender-procurement
    financials: [
      {
        period: "Tender Package 3 2025",
        revenue: 92000000,
        productionCost: 58000000,
        operationalCost: 12500000,
        netProfit: 16500000,
      },
      {
        period: "Tender Package 1 2026",
        revenue: 105000000,
        productionCost: 65000000,
        operationalCost: 14200000,
        netProfit: 19800000,
      },
      {
        period: "Tender Package 2 2026",
        revenue: 118000000,
        productionCost: 72000000,
        operationalCost: 15500000,
        netProfit: 22500000,
      },
    ],
    updates: [],
  },
  {
    id: "other-renovation-interior",
    name: "Renovation & Interior Projects",
    businessName: "WebBotPro Projects",
    category: "Other Business Projects",
    status: "Open for Funding",
    image: "/images/investing/other-renovation.jpg",
    description:
      "Project funding for home renovation, office refurbishment, interior work, and small-scale commercial improvement projects.",
    fundingTarget: 200000000,
    fundingCollected: 95000000,
    minimumInvestment: 20000000,
    projectDuration: "Per Project",
    riskLevel: "Medium",
    targetProfitSharing: "40% Investor : 60% Operator",
    useOfFunds: [
      "Material costs",
      "Labor costs",
      "Subcontractor fees",
      "Project documentation",
    ],
    // other-renovation-interior
    financials: [
      {
        period: "Q3 2025",
        revenue: 48000000,
        productionCost: 22000000,
        operationalCost: 8500000,
        netProfit: 14500000,
      },
      {
        period: "Q4 2025",
        revenue: 62000000,
        productionCost: 28000000,
        operationalCost: 10500000,
        netProfit: 18500000,
      },
      {
        period: "Q1 2026",
        revenue: 55000000,
        productionCost: 25000000,
        operationalCost: 9200000,
        netProfit: 16800000,
      },
      {
        period: "Q2 2026",
        revenue: 71000000,
        productionCost: 32000000,
        operationalCost: 11800000,
        netProfit: 21200000,
      },
    ],
    updates: [],
  },
];

export const getInvestmentProject = (projectId: string) => {
  return investmentProjects.find((project) => project.id === projectId);
};