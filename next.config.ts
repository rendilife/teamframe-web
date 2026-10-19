
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  async rewrites() {
    return [
      {
        source: "/glyphflow-beta",
        destination: "https://blue-dream-9863.rendi023.workers.dev/beta",
      },
      {
        source: "/beta",
        destination: "https://blue-dream-9863.rendi023.workers.dev/beta",
      },
      {
        source: "/api/public/beta-application",
        destination: "https://blue-dream-9863.rendi023.workers.dev/api/public/beta-application",
      },
    ];
  },
};

export default nextConfig;
