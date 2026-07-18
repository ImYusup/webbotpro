// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import CartSidebar from "@/components/CartSidebar";
import PaypalScript from "@/components/PaypalScript";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webbotpro.com"),

  title: {
    default:
      "WebBotPro | WhatsApp Automation, AI Solutions & Business Intelligence",
    template: "%s | WebBotPro",
  },

  description:
    "WebBotPro helps businesses worldwide automate WhatsApp, build professional websites, AI solutions, digital marketing, e-commerce, and business intelligence dashboards.",

  applicationName: "WebBotPro",
  generator: "WebBotPro Global Platform",
  category: "Technology",

  authors: [
    {
      name: "WebBotPro",
      url: "https://webbotpro.com",
    },
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  keywords: [
    "WebBotPro",
    "WhatsApp Automation",
    "WhatsApp Business API",
    "WhatsApp Commerce Automation",
    "WhatsApp Integration",
    "WhatsApp Chatbot",
    "AI Automation",
    "AI Agent",
    "CRM Automation",
    "Workflow Automation",
    "Business Automation",
    "Digital Marketing",
    "Website Development",
    "Web Development",
    "Next.js Development",
    "Ecommerce Website",
    "Company Profile Website",
    "SEO",
    "Paid Ads",
    "Business Intelligence",
    "Power BI Dashboard",
    "Dashboard",
    "Data Analytics",
    "Data Visualization",
    "Indonesia",
    "Singapore",
    "Global Digital Agency",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "WebBotPro | WhatsApp Automation, AI & Business Intelligence",
    description:
      "Global automation solutions including WhatsApp Business Automation, AI Solutions, Websites, Digital Marketing and Business Intelligence.",
    url: "https://webbotpro.com",
    siteName: "WebBotPro",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebBotPro",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "WebBotPro | WhatsApp Automation, AI & Business Intelligence",
    description:
      "Helping businesses worldwide with WhatsApp Automation, AI Solutions, Websites, Digital Marketing and Business Intelligence.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartSidebar />
        <PaypalScript />
      </body>
    </html>
  );
}