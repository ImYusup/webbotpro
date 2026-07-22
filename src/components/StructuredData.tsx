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
          url: "https://webbotpro.com/logo/logo.png",
        },
        description:
          "WebBotPro provides website development, WhatsApp automation, AI solutions, digital marketing, SEO, paid advertising, and business intelligence services worldwide.",
        email: "hello@webbotpro.com",
        sameAs: [
          "https://facebook.com/webbotpro",
          "https://instagram.com/webbotpro",
          "https://linkedin.com/company/webbotpro"
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
        telephone: "+628xxxxxxxxxx",
        areaServed: "Worldwide",
        priceRange: "$$",
        description:
          "Professional website development, WhatsApp Business API integration, AI automation, SEO, digital marketing, Meta Ads, Google Ads, e-commerce development, and business intelligence services.",
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