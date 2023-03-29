import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import vitePluginRequire from "vite-plugin-require";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCommonjs()],
  server: {
    open: true,
  },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     plugins: [vitePluginRequire()],
  //   },
  // },
});
