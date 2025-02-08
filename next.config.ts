import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src'), process.cwd()],
  },
  // Remove the custom webpack config since Next.js handles CSS/SCSS modules by default
};

export default nextConfig;
