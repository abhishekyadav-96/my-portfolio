import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],
  },
  // Netlify specific optimizations
  output: 'standalone',
  typescript: {
    // Netlify sometimes fails on warnings, let's ensure it's strictly correct
    ignoreBuildErrors: false,
  },
};

export default nextConfig;