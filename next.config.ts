import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apidev.tvku.tv',
      },
      {
        protocol: 'https',
        hostname: 'storage.tvku.tv',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'tvku.tv',
      },
    ],
  },
};

export default nextConfig;
