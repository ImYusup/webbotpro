// src/app/api/paypal/tokenCache.ts
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_MODE = (process.env.PAYPAL_MODE || process.env.PAYPAL_ENV || "sandbox").toLowerCase();
const PAYPAL_BASE = PAYPAL_MODE === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

let cached: { token: string; expiresAt: number } | null = null;

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

export async function getPayPalAccessTokenCached(): Promise<string> {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("Missing PayPal credentials on the server. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.");
  }

  if (cached && cached.expiresAt > nowSeconds() + 30) {
    return cached.token;
  }

  const basic = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const text = await res.text();
  let json: any;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }

  if (!res.ok) {
    const msg = `PayPal token fetch failed: ${res.status} ${res.statusText} ${JSON.stringify(json)}`;
    console.error(msg);
    throw new Error(msg);
  }

  if (!json?.access_token || !json?.expires_in) {
    const msg = `Invalid token response: ${JSON.stringify(json)}`;
    console.error(msg);
    throw new Error(msg);
  }

  const token = json.access_token as string;
  const expiresIn = Number(json.expires_in) || 3600;
  cached = { token, expiresAt: nowSeconds() + expiresIn };
  return token;
}
