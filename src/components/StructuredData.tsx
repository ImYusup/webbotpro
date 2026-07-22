// src/components/StructuredData.tsx
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://webbotpro.com/#organization",
        name: "WebBotPro",
        url: "https://webbotpro.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.webbotpro.com/favicon.png",
        },
        description:
          "WebBotPro provides website development, WhatsApp automation, AI solutions, live commerce services, digital marketing, SEO, paid advertising, and business intelligence solutions worldwide.",
        email: "webbotproo@gmail.com",
        sameAs: [
          "https://facebook.com/webbotpro",
          "https://instagram.com/webbotpro",
          "https://linkedin.com/company/webbotpro"
        ],
        serviceType: [
          "Website Development",
          "Custom Website Development",
          "Company Profile Website",
          "E-Commerce Website",
          "WhatsApp Automation",
          "WhatsApp Business API",
          "WhatsApp Chatbot",
          "AI Automation",
          "AI Agent",
          "AI Chatbot",
          "Digital Marketing",
          "SEO Services",
          "Google Ads Management",
          "Meta Ads Management",
          "Facebook Ads",
          "Instagram Ads",
          "Social Media Marketing",
          "Business Intelligence",
          "Power BI Dashboard",
          "Data Analytics",
          "Live Commerce",
          "Shopee Live",
          "TikTok Shop Live",
          "Facebook Live",
          "Instagram Live",
          "E-Commerce Live Streaming"
        ]
      },

      {
        "@type": "WebSite",
        "@id": "https://webbotpro.com/#website",
        url: "https://webbotpro.com",
        name: "WebBotPro",
        publisher: {
          "@id": "https://webbotpro.com/#organization"
        },
        inLanguage: "en"
      },

      {
        "@type": "ProfessionalService",
        "@id": "https://webbotpro.com/#service",
        name: "WebBotPro",
        image: "https://webbotpro.com/og-image.png",
        url: "https://webbotpro.com",
        telephone: "+6285975149508",
        areaServed: "Worldwide",
        priceRange: "$$",
        description:
          "Professional website development, WhatsApp Business API integration, AI automation, Live Commerce, Shopee Live, TikTok Shop Live, Facebook Live, Instagram Live, SEO, digital marketing, Google Ads, Meta Ads, e-commerce development, and business intelligence services.",
        provider: {
          "@id": "https://webbotpro.com/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}