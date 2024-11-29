import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { API_URL } from "./src/lib/contants.ts";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": {
        target: API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, "/auth"),
      },
    },
  },
});
