import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api-bakong": {
        target: "https://api-bakong.nbc.gov.kh",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-bakong/, ""),
      },
    },
  },
});
