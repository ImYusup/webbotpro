// src/app//pricing//[category]/page.tsx
"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";

type Props = {
  params: Promise<{ category: string }>;
};

const pricingData: Record<
  string,
  {
    title: string;
    plans?: {
      name: string;
      price?: string;
      description: string;
      features?: string[];
      note?: string;
    }[];
    content?: string;
    contact?: string;
  }
> = {
  whatsapp: {
    title: "📱 WhatsApp Commerce Automation – Pricing Plan",
    plans: [
      {
        name: "🌱 Starter",
        price: "$125 - $150",
        description: "For small businesses or individuals starting to sell via WhatsApp.",
        features: [
          "Auto-Reply & Welcome Greeting",
          "Product Catalog (Google Sheet integration)",
          "Flexible Pricing Package",
          "Customer Data & Chat History Logging",
          "Basic Order Workflow",
        ],
        note: "Best for: small shops, home-based businesses, new resellers",
      },
      {
        name: "💼 Business",
        price: "$225 - $375",
        description: "For growing SMBs that need a more efficient system.",
        features: [
          "All Starter Features",
          "Automated Payment Confirmation",
          "Google Sheets Integration",
          "Real-Time Shipping Tracking",
          "Multi-Product Checkout via WhatsApp",
        ],
        note: "Best for: wholesalers, distributors, online shops with >50 orders/day",
      },
      {
        name: "🏢 Premium",
        price: "$450 - $750",
        description: "For corporates & enterprises with high scalability needs.",
        features: [
          "All Business Features",
          "Dedicated High-Performance VPS",
          "AI Product Assistant",
          "Multi-User Support",
          "Automated Transaction Reports",
        ],
        note: "Best for: distribution companies, corporate retail, e-commerce platforms",
      },
    ],
    contact: "Contact via WhatsApp",
  },
  marketing: {
    title: "🎯 Digital Presence & Marketing – Pricing Plan",
    plans: [
      {
        name: "🌱 Starter",
        price: "$750",
        description: "For small businesses that want to establish their digital identity.",
        features: [
          "Company Profile / Landing Page Website (1–3 pages)",
          "Domain + Hosting (1 year)",
          "Basic Social Media Setup (1 account, 12 post templates)",
        ],
        note: "Best for: clinics, courses, local services",
      },
      {
        name: "💼 Business",
        price: "$1200",
        description: "For SMEs aiming to expand their audience reach.",
        features: [
          "All Starter Features",
          "E-Commerce / Full Company Profile Website",
          "Social Media Management (1 account, 20 post templates)",
          "10K IG/FB Followers",
          "1 Viral IG/FB Content (700K views & 50K likes)",
          "National SEO Optimization",
        ],
        note: "Best for: restaurants, cafés, medium online shops",
      },
      {
        name: "🏢 Premium",
        price: "$1500",
        description: "For corporates/brands seeking complete digital presence solutions.",
        features: [
          "All Business Features",
          "Custom Website (Landing Page + E-Commerce)",
          "Premium Social Media Management (1 account, 30 post templates)",
          "30K IG/FB Followers",
          "1 Viral IG/FB Content (1M views & 150K likes)",
          "Advanced SEO",
          "Free 1-Month Ads Trial",
        ],
        note: "Best for: franchises, corporate brands, large e-commerce",
      },
    ],
    contact: "Contact via WhatsApp",
  },
  data: {
    title: "📊 Data & Business Intelligence – Pricing Plan",
    plans: [
      {
        name: "🌱 Starter",
        price: "$150",
        description: "For small/medium businesses that want to organize data & monitoring.",
        features: [
          "Data Visualization + Basic Dashboard",
          "3x Revisions",
          "7 Charts/Graphs",
          "Basic Data Source Connection (Excel, CSV)",
          "Basic Data Cleaning",
        ],
        note: "Best for: SMEs, retail shops, local businesses, branch offices",
      },
      {
        name: "💼 Business",
        price: "$300",
        description: "For SMEs & corporates needing advanced analytics.",
        features: [
          "All Starter Features",
          "Advanced Reporting & Interactive Visuals",
          "7x Revisions",
          "15 Charts/Graphs",
          "Interactive/Animated Visuals",
          "Advanced Data Cleaning + Multi-Source",
          "Data Connectivity (Excel, Database, API)",
        ],
        note: "Best for: distributors, restaurant chains, growing startups",
      },
    ],
    contact: "Contact Us",
  },
  "about-us": {
    title: "About WebBotPro",
    content: `
WebBotPro — Empowering Digital Automation from Bandung 🌆

**Our Core Services:**
- WhatsApp Commerce Automation: auto-replies, product catalogs, order & invoice workflows, Google Sheets & database integration
- Digital Presence & Marketing: websites (company profile / e-commerce / landing page), social media management & optimization, follower growth & engagement, digital ads (Meta, Google, TikTok), SEO
- Data & Business Intelligence: interactive dashboards with Power BI, sales/marketing/ops data visualization, data integration from Excel, databases, APIs

**Why Choose WebBotPro?**
- End-to-End Solutions: From WhatsApp sales automation to digital marketing & data analytics.
- Competitive Pricing, Maximum Value: Packages for startups to enterprise with flexible add-ons.
- Local Expertise from Bandung: Easy coordination, on-site meetings, quick adaptation to market needs.
- Scalable & Customizable: Suitable for SMEs up to large enterprises.
    `,
  },
  "custom-testimonials": {
    title: "Custom Solutions",
    content: `
Please fill out the form below to request your custom application:

- **Name**: Enter your full name.
- **Phone Number**: Enter a valid contact number.
- **Email**: Enter your email address.
- **Application Request**: Describe your application needs in detail.
    `,
  },
};

export default function PricingCategoryPage({ params }: Props) {
  const categoryParams = use(params);
  const { category } = categoryParams;
  console.log("Client: Category received:", category);

  const data = pricingData[category.toLowerCase()];

  if (!data) {
    console.log("Client: Data not found for category:", category);
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-20 container mx-auto px-4 flex-1">
        <h1 className="text-4xl font-bold mb-10 text-center text-foreground">{data.title}</h1>
        {data.plans ? (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {data.plans.map((plan, i) => (
                <div
                  key={i}
                  className="p-6 border rounded-xl shadow-lg bg-card hover:shadow-xl transition-all text-center flex flex-col h-full"
                >
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">{plan.name}</h2>
                    {plan.price && (
                      <p className="text-4xl font-extrabold text-primary mb-6">{plan.price}</p>
                    )}
                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="text-sm space-y-2 mb-6 max-w-xs mx-auto">
                      {plan.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✔</span>
                          <span className="break-words text-left text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-muted-foreground">{plan.note}</p>
                  </div>
                  <div className="mt-auto pt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      *Prices may vary depending on specific requirements.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="https://wa.me/6281289066999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {data.contact}
              </Link>
            </div>
          </>
        ) : data.content ? (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
            <div
              className="text-foreground font-serif"
              dangerouslySetInnerHTML={{ __html: data.content.replace(/\n/g, "<br>") }}
            />
            {category.toLowerCase() === "custom-testimonials" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form submitted:", {
                    name: (e.target as any).name.value,
                    phone: (e.target as any).phone.value,
                    email: (e.target as any).email.value,
                    requestApps: (e.target as any).requestApps.value,
                  });
                  alert("Thank you! Your request has been submitted. We will contact you shortly.");
                  (e.target as any).reset();
                }}
                className="mt-6 space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border border-border p-2"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="mt-1 block w-full rounded-md border border-border p-2"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border border-border p-2"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="requestApps" className="block text-sm font-medium text-foreground">Application Request</label>
                  <textarea
                    id="requestApps"
                    name="requestApps"
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-border p-2"
                    placeholder="Describe your application needs here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}