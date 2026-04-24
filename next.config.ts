import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@storentia/sdk"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.techsolace.in",
      },
    {
        protocol: "https",
        hostname: "images.unsplash.com",
    }
    ],
  },
};

export default nextConfig;
