import type { NextConfig } from "next";

/** Mesma base do Assistente TB, sem banco: por enquanto é só o visual. */
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
