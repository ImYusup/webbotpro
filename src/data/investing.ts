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
    targetProfitSharing: "8-10%",
    useOfFunds: [
      "Trading capital allocation",
      "Risk management reserve",
      "Market analysis and monitoring",
      "Operational and reporting costs",
    ],
    financials: [],
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
    targetProfitSharing: "8-10%",
    useOfFunds: [
      "Equity trading capital",
      "Risk management reserve",
      "Market research",
      "Operational and reporting costs",
    ],
    financials: [],
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
    targetProfitSharing: "8-10%",
    useOfFunds: [
      "Crypto trading capital",
      "Risk management reserve",
      "Market monitoring tools",
      "Operational and reporting costs",
    ],
    financials: [],
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
    targetProfitSharing: "25-30%",
    useOfFunds: [
      "Land preparation",
      "Seeds and fertilizers",
      "Cultivation management",
      "Harvest and distribution",
    ],
    financials: [],
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
    targetProfitSharing: "10-15%",
    useOfFunds: [
      "Livestock purchase",
      "Feed and medicine",
      "Farm facilities",
      "Production monitoring",
    ],
    financials: [],
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
    projectDuration: "1 Month",
    riskLevel: "Medium",
    targetProfitSharing: "8-10%",
    useOfFunds: [
      "Layer chicken stock",
      "Feed and supplements",
      "Cage maintenance",
      "Egg production monitoring",
    ],
    financials: [],
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
    financials: [],
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
    financials: [],
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
    financials: [],
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
    targetProfitSharing: "Based on verified project profit",
    useOfFunds: [
      "Labor funding",
      "Operational costs",
      "Transportation",
      "Project monitoring",
    ],
    financials: [],
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
    targetProfitSharing: "Based on verified project profit",
    useOfFunds: [
      "Working capital",
      "Procurement of goods/services",
      "Delivery and logistics",
      "Project administration",
    ],
    financials: [],
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
    targetProfitSharing: "Based on verified project profit",
    useOfFunds: [
      "Material costs",
      "Labor costs",
      "Subcontractor fees",
      "Project documentation",
    ],
    financials: [],
    updates: [],
  },
];

export const getInvestmentProject = (projectId: string) => {
  return investmentProjects.find((project) => project.id === projectId);
};