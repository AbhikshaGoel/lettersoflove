// import { NextResponse } from "next/server";
// import { HttpsProxyAgent } from "https-proxy-agent";

// export async function POST(request: Request) {
//   const { query, variables } = await request.json();

//   const WP_URL = process.env.WORDPRESS_API_URL;
//   const PROXY_URL = process.env.CORPORATE_PROXY_URL;

//   // 1. Prepare Headers (Auth)
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//   };
//   const user = process.env.WORDPRESS_AUTH_USER;
//   const pass = process.env.WORDPRESS_AUTH_PASS;
//   if (user && pass) {
//     headers["Authorization"] =
//       `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;
//   }

//   // 2. Prepare Proxy Agent
//   let agent: any = undefined;
//   if (PROXY_URL) {
//     agent = new HttpsProxyAgent(PROXY_URL);
//   }

//   try {
//     // 3. Fetch from WordPress through Corporate Proxy
//     const res = await fetch(WP_URL!, {
//       method: "POST",
//       headers,
//       body: JSON.stringify({ query, variables }),
//       cache: "no-store",
//       // @ts-ignore
//       agent: agent,
//     });

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Proxy Route Error:", error);
//     return NextResponse.json(
//       { error: "Failed to connect via Corporate Proxy" },
//       { status: 500 },
//     );
//   }
// }
