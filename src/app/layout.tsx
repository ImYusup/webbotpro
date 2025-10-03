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
  title: "WebBotPro - WhatsApp Automation, Digital Marketing & Business Intelligence",
  description:
    "WebBotPro empowers businesses globally with WhatsApp Commerce Automation, Digital Marketing, and Data & Business Intelligence.",
  keywords: [
    // WhatsApp Automation
    "WhatsApp Commerce Automation",
    "WhatsApp Automation",
    "Business WhatsApp",
    "Chatbot for Business",
    "WhatsApp Integration",
    "Ecommerce Automation",
    "Invoice Automation",
    "Customer Engagement",

    // Digital Marketing
    "Digital Marketing",
    "Website Development",
    "Social Media Management",
    "SEO",
    "Paid Ads",
    "Brand Awareness",
    "Business Growth",
    "Online Marketing",
    "Digital Presence",

    // Data & BI
    "Business Intelligence",
    "Data Driven",
    "Dashboard",
    "Data Analytics",
    "Data Visualization",
    "Automation Platform",
    "WebBotPro",
    "Grow With Data",
  ],
  generator: "WebBotPro Global Platform",
  metadataBase: new URL("https://webbotpro.com"),
  openGraph: {
    title: "WebBotPro - Global Automation & Digital Solutions",
    description:
      "Empowering global businesses with WhatsApp Automation, Digital Marketing, and Data Intelligence.",
    url: "https://webbotpro.com",
    siteName: "WebBotPro",
    images: [
      {
        url: "https://webbotpro.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebBotPro Automation Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@webbotpro",
    title: "WebBotPro - Automation & Digital Solutions",
    description:
      "Global solutions for WhatsApp Automation, Digital Marketing, and Business Intelligence.",
    images: ["https://webbotpro.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <head>
        <link rel="canonical" href="https://webbotpro.com" />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartSidebar />
        <PaypalScript />
      </body>
    </html>
  );
}