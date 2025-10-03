// next.config.js
require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com"],
  },
  env: {
    NEXT_PUBLIC_INTERNAL_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_INTERNAL_ACCESS_TOKEN || "dev-test",
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "webbotpro.myshopify.com",
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  },
};