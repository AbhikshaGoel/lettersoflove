/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.lettersofsoul.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost" },
      {
        protocol: "https",
        hostname: "api.lettersofsoul.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  // REMOVE the async rewrites() section completely
};

export default nextConfig;
