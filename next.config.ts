import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fija la raíz del proyecto para Turbopack (evita confusión por lockfiles externos)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
