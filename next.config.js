// next.config.js
require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com"], // Tambah hostname Shopify CDN
  },
  // Tambah konfigurasi lain kalau ada
};