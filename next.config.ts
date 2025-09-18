import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output for Heroku deployment
  output: 'standalone',
  
  // Disable static optimization for development to use CSR
  experimental: {
    staticGenerationRetryCount: 0,
  },
};

export default nextConfig;
