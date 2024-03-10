import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, "", "");

  return {
    server: {
      port: env.VITE_CLIENT_PORT,
      // proxy: {
      //   "/api/v1": {
      //     target: `${env.VITE_CRM_BACKEND_URL}`,
      //     changeOrigin: true,
      //   },
      // },
      cors:{
        origin: `${env.VITE_CORS_ORIGIN}` || '*',
        credentials: true,
      }
    },
    build: {
      outDir: "dist",     
    },

    plugins: [react()],
  };
});
