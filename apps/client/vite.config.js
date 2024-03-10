import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, "", "");

  return {
    server: {
      port: 3000,
      // proxy: {
      //   "/api/v1": {
      //     target: `${env.VITE_CRM_BACKEND_URL}`,
      //     changeOrigin: true,
      //   },
      // },
      cors:{
        origin: `${env.VITE_CORS_ORIGIN}` || 'http://localhost:3001',
        credentials: true,
      }
    },
    build: {
      outDir: "dist",
    },
    plugins: [react()],
  };
});
