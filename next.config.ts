import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output for Heroku deployment
  output: 'standalone',
};

export default nextConfig;
