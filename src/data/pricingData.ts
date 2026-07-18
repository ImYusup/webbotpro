// src/data/pricingData.ts
export const pricingCategories = [
  {
    id: "whatsapp",
    name: "Automation",
  },
  {
    id: "marketing",
    name: "Websites",
  },
  {
    id: "data",
    name: "Business Intelligence",
  },
];

export const pricingData = {
  whatsapp: {
    title: "Automation",
    plans: [
      {
        name: "🌱 Starter",
        priceFrom: "Rp 500.000",
        priceTo: "Rp 1.000.000",
        description:
          "For small businesses or individuals starting to sell via WhatsApp.",
        features: [
          "Auto Reply & Welcome Greeting",
          "Product Catalog Management",
          "Google Sheets Integration",
          "Customer Data & Chat Logging",
          "Basic Order Workflow",
          "Flexible Workflow Customization",
        ],
        note:
          "Best for: small shops, home business, new reseller",
        preOrderNote:
          "Minimum DP 70%. Development starts after payment and usually takes 5–7 business days.",
      },
      {
        name: "💼 Business",
        priceFrom: "Rp 1.500.000",
        priceTo: "Rp 2.500.000",
        description:
          "Designed for growing businesses that need smarter workflows and advanced WhatsApp automation.",
        features: [
          "Everything in Starter",
          "Automated Payment Confirmation",
          "Shipping Tracking",
          "WhatsApp Checkout Automation",
          "Advanced Google Sheets Sync",
          "Order Status Management",
        ],
        note:
          "Best for: online shop, distributor, wholesaler",
        preOrderNote:
          "Minimum DP 70%. Development starts after payment and usually takes 5–7 business days.",
      },
      {
        name: "🏢 Premium",
        priceFrom: "Rp 3.000.000",
        priceTo: "Rp 5.000.000",
        description:
          "Built for enterprises requiring scalable automation, AI integration, and dedicated infrastructure.",
        features: [
          "Everything in Business",
          "Dedicated VPS Deployment",
          "AI Customer Assistant",
          "Multi User Access",
          "Automated Sales Reports",
          "Priority Technical Support",
        ],
        note:
          "Best for: corporate & enterprise",
        preOrderNote:
          "Minimum DP 70%. Development starts after payment and usually takes 5–7 business days.",
      },
    ],
  },

  marketing: {
    title: "Websites",
    plans: [
      {
        name: "🌱 Starter",
        priceFrom: "Rp 3.000.000",
        priceTo: "Rp 5.000.000",
        description:
          "Perfect for startups and small businesses looking to establish a professional online presence.",
        features: [
          "Landing Page (1–3 Pages)",
          "Free Domain & Hosting (3 Year)",
          "Basic SEO Optimization",
          "Google Business Profile Setup",
          "12 Social Media Post Templates",
          "1 Revision",
        ],
        note: "Best for SMEs",
        preOrderNote:
          "Minimum DP 70%. Development starts after payment and usually takes 5–7 business days.",
      },
      {
        name: "💼 Business",
        priceFrom: "Rp 6.000.000",
        priceTo: "Rp 8.000.000",
        description:
          "Ideal for companies that need a modern, feature-rich website to support business growth.",
        features: [
          "Everything in Starter",
          "Company Profile / E-Commerce",
          "Advanced SEO Optimization",
          "20 Social Media Post Templates",
          "10K Instagram/Facebook Followers",
          "1 Viral Content Campaign",
          "Analytics Integration",
          "2 Revisions",
        ],
        note: "Best for growing companies",
        preOrderNote:
          "Minimum DP 70%. Development starts after payment and usually takes 5–7 business days.",
      },
      {
        name: "🏢 Premium",
        priceFrom: "Rp 10.000.000",
        priceTo: "Rp 12.000.000",
        description:
          "Tailored for organizations requiring a fully customized website with premium features and ongoing scalability.",
        features: [
          "Everything in Business",
          "Custom Website Development",
          "Premium SEO Strategy",
          "30 Social Media Post Templates",
          "30K Instagram/Facebook Followers",
          "1M+ Reach Viral Campaign",
          "Google Ads Setup",
          "Monthly Performance Report",
          "Priority Support",
        ],
        note: "Best for enterprise",
        preOrderNote:
          "Minimum DP 70%. Development starts after payment and usually takes 5–7 business days.",
      },
    ],
  },

  data: {
    title: "Business Intelligence",
    plans: [
      {
        name: "🌱 Starter",
        priceFrom: "Rp 3.000.000",
        priceTo: "",
        description:
          "For businesses that need clear dashboards and essential reporting to monitor daily performance.",
        features: [
          "Interactive Dashboard",
          "Excel & CSV Integration",
          "Basic Data Cleaning",
          "Up to 7 Charts",
          "PDF & Excel Export",
          "3 Revisions",
        ],
        note: "Best for SMEs",
        preOrderNote:
          "Minimum DP 70%. Development starts after payment and usually takes 5–7 business days.",
      },
      {
        name: "💼 Business",
        priceFrom: "Rp 5.000.000",
        priceTo: "",
        description:
          "Designed for organizations that require advanced analytics, data integration, and interactive dashboards.",
        features: [
          "Everything in Starter",
          "Advanced Interactive Dashboard",
          "Database & API Integration",
          "Multi Data Sources",
          "Up to 15 Charts",
          "Multi User Access (5 Users)",
          "Monthly Performance Report",
          "Priority Support",
          "7 Revisions",
        ],
        note: "Best for corporate",
        preOrderNote:
          "Minimum DP 70%. Development starts after payment and usually takes 5–7 business days.",
      },
    ],
  },
};