import type { NextConfig } from "next";
import path from 'path';

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src'), process.cwd()],
  },
  // Remove the custom webpack config since Next.js handles CSS/SCSS modules by default
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = withPWA(nextConfig);
