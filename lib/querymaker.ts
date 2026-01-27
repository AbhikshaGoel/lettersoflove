import { ProxyAgent } from "undici";

// 1. Get Environment Variables
const API_URL = process.env.WORDPRESS_API_URL;
const WP_USER = process.env.WORDPRESS_AUTH_USER;
const WP_PASS = process.env.WORDPRESS_AUTH_PASS;
const PROXY_RAW_URL = process.env.CORPORATE_PROXY_URL;

// --- DEVELOPMENT ONLY FIX ---
// If the specific Agent config fails, uncomment the line below to force-disable SSL checks globally.
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function fetchGraphQL(query: string, variables: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // 1. Setup Auth
  if (WP_USER && WP_PASS) {
    headers["Authorization"] =
      `Basic ${Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64")}`;
  }

  // 2. Setup Fetch Options
  let fetchOptions: any = {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: { tags: ["wordpress"] },
    cache: "force-cache",
  };

  // 3. Setup Corporate Proxy
  if (PROXY_RAW_URL) {
    try {
      const proxyUrl = new URL(PROXY_RAW_URL);

      // Encode credentials if they exist
      if (proxyUrl.username && proxyUrl.password) {
        proxyUrl.username = encodeURIComponent(
          decodeURIComponent(proxyUrl.username),
        );
        proxyUrl.password = encodeURIComponent(
          decodeURIComponent(proxyUrl.password),
        );
      }

      // --- THE FIX IS HERE ---
      const dispatcher = new ProxyAgent({
        uri: proxyUrl.toString(),
        // This tells the Agent: "When you upgrade the connection to SSL for the target site,
        // ignore the fact that the certificate comes from my company proxy."
        requestTls: {
          rejectUnauthorized: false,
        },
      });

      fetchOptions.dispatcher = dispatcher;
    } catch (e) {
      console.error("⚠️ Proxy Config Error:", e);
    }
  }

  try {
    const res = await fetch(API_URL!, fetchOptions);

    if (!res.ok) {
      const txt = await res.text();
      console.error(`❌ API Error (${res.status}):`, txt);
      throw new Error(`API responded with ${res.status}`);
    }

    const json = await res.json();
    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      throw new Error("Failed to fetch GraphQL API");
    }
    return json.data;
  } catch (error: any) {
    console.error("❌ Connection Failed:", error.message);
    if (error.cause) console.error("Cause:", error.cause);
    throw error;
  }
}
