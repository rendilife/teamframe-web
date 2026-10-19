
import type { NextConfig } from "next";

const worker = "https://blue-dream-9863.rendi023.workers.dev";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  async rewrites() {
    return [
      { source: "/glyphflow-beta", destination: `${worker}/beta` },
      { source: "/beta", destination: `${worker}/beta` },
      { source: "/api/public/beta-application", destination: `${worker}/api/public/beta-application` },
      { source: "/terms", destination: `${worker}/terms` },
      { source: "/privacy", destination: `${worker}/privacy` },
      { source: "/account-deletion", destination: `${worker}/account-deletion` },
      { source: "/data-deletion", destination: `${worker}/data-deletion` },
    ];
  },
};

export default nextConfig;
