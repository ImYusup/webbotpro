// src/components/PaypalScript.tsx
"use client";

import Script from "next/script";

export default function PaypalScript() {
  return (
    <Script
      src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD&intent=capture`}
      strategy="afterInteractive"
      onLoad={() => console.log("✅ PayPal SDK loaded")}
      onError={(e) => console.error("❌ PayPal SDK failed to load", e)}
    />
  );
}
