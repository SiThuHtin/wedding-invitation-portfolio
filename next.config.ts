import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/**", search: "?v=2" },
    ],
  },
};

export default nextConfig;
