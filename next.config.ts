import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use SSR for production, CSR for development
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // Disable static optimization for development to use CSR
  experimental: {
    staticGenerationRetryCount: 0,
  },
};

export default nextConfig;
