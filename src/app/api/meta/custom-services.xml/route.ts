// src/app/api/meta/custom-services.xml/route.ts

const BASE_URL = "https://webbotpro.com";

const services = [
  {
    id: "custom-whatsapp-automation",
    title: "Custom WhatsApp Automation",
    description: `Professional WhatsApp automation solutions tailored for businesses of all sizes.

✔ AI Agent
✔ Auto Reply
✔ Product Catalog
✔ Payment Gateway
✔ CRM Integration
✔ Google Sheets
✔ Custom Workflow
✔ Custom API Integration

• Suitable for SMEs & Enterprise
• Fully Customized Solution
• Scalable Architecture
• Worldwide Deployment

Price shown in this catalog is for listing purposes only.
Final pricing depends on features, integrations, workflow complexity, and project requirements.
Contact us for a personalized quotation.`,
    price: 1,
    image: "/images/meta/custom-whatsapp.png",
    link: "/pricing#whatsapp",
    category: "Automation",
  },

  {
    id: "custom-website-development",
    title: "Custom Website Development",
    description: `Professional website development for startups, businesses, and enterprises.

✔ Landing Page
✔ Company Profile
✔ Business Website
✔ E-Commerce Website
✔ SEO Optimization
✔ Payment Gateway
✔ Free Domain & Hosting 3 Years
✔ Custom Features

• Responsive Design
• Modern UI/UX
• Optimized Performance
• Worldwide Deployment

Price shown in this catalog is for listing purposes only.
Final pricing depends on the number of pages, custom features, integrations, and project scope.
Contact us for a personalized quotation.`,
    price: 1,
    image: "/images/meta/custom-website.png",
    link: "/pricing#marketing",
    category: "Websites",
  },

  {
    id: "custom-live-commerce",
    title: "Custom Live Commerce",
    description: `Professional live commerce services for brands and online businesses.

✔ Shopee Live
✔ TikTok Shop Live
✔ Facebook Live
✔ Instagram Live
✔ Tokopedia Live
✔ Lazada Live
✔ Professional Host
✔ OBS Studio
✔ Multi-Platform Streaming

• Hourly, Daily & Monthly Packages
• Professional Production Team
• Studio & Equipment Available
• Campaign-Based Services

Price shown in this catalog is for listing purposes only.
Final pricing depends on campaign duration, production requirements, platform selection, and manpower.
Contact us for a personalized quotation.`,
    price: 1,
    image: "/images/meta/custom-livecommerce.png",
    link: "/pricing#live-commerce",
    category: "Live Commerce",
  },

  {
    id: "custom-business-intelligence",
    title: "Business Intelligence & Power BI",
    description: `Business Intelligence solutions and interactive dashboards for data-driven organizations.

✔ Power BI Dashboard
✔ KPI Monitoring
✔ Google Sheets
✔ Microsoft Excel
✔ Database Integration
✔ API Integration
✔ Automated Reporting
✔ Executive Dashboard

• Interactive Visualization
• Real-Time Analytics
• Custom Business Reports
• Enterprise Ready

Price shown in this catalog is for listing purposes only.
Final pricing depends on data sources, integrations, dashboard complexity, and business requirements.
Contact us for a personalized quotation.`,
    price: 1,
    image: "/images/meta/custom-bi.png",
    link: "/pricing#data",
    category: "Business Intelligence",
  },
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
xmlns:g="http://base.google.com/ns/1.0">
<channel>

<title>WebBotPro Custom Services</title>
<link>${BASE_URL}</link>
<description>Professional Custom Digital Services by WebBotPro</description>

${services
  .map(
    (service) => `
<item>

<g:id>${service.id}</g:id>

<g:title><![CDATA[
${service.title}
]]></g:title>

<g:description><![CDATA[
${service.description}
]]></g:description>

<g:link>
${BASE_URL}${service.link}
</g:link>

<g:image_link>
${BASE_URL}${service.image}
</g:image_link>

<g:availability>in stock</g:availability>

<g:condition>new</g:condition>

<g:price>${service.price} IDR</g:price>

<g:brand>WebBotPro</g:brand>

<g:product_type>${service.category}</g:product_type>

</item>
`
  )
  .join("")}

</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}