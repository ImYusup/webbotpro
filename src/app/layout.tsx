// src/app/layout.ts
import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import CartSidebar from "@/components/CartSidebar";
import Script from "next/script";
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
    "WebBotPro empowers businesses with WhatsApp Commerce Automation, Digital Presence & Marketing, and Data & Business Intelligence for SMEs and enterprises.",
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
        <CartSidebar /> {/* ✅ Inject cart sidebar di sini */}
        <PaypalScript /> {/* ✅ Inject script dari Client Component */}
      </body>
    </html>
  );
}
