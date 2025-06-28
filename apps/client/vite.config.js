import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      hmr: { overlay: false },
      proxy: {
        "/api": {
          target: env.VITE_CRM_BACKEND_URL || "http://localhost:5173",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    optimizeDeps: {
      include: [
        "@chakra-ui/react",
        "@emotion/react",
        "@emotion/styled",
        "framer-motion",
      ],
    },
    // Production-specific settings
    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: mode !== "production", // Disable sourcemap in production
      chunkSizeWarningLimit: 1600, // Increase chunk size warning limit
    },
  };
});