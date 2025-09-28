// src/components/PaypalLoader.tsx
"use client";

import Script from "next/script";
import React from "react";

type Props = React.PropsWithChildren<{
  currency?: string;
}>;

export default function PaypalLoader({ children, currency = "USD" }: Props) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "REPLACE_ME";
  const src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${encodeURIComponent(
    currency,
  )}&intent=capture`;

  return (
    <>
      <Script
        src={src}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ PayPal SDK loaded");
        }}
        onError={(e) => {
          console.error("❌ PayPal SDK failed to load", e);
        }}
      />
      {children}
    </>
  );
}
