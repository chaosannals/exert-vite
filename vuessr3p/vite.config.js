import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteSSR from "vite-ssr/plugin";
import api from "./srv/api";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteSSR(),
    vue(),
    {
      configureServer({ middlewares }) {
        api.forEach(({ route, handler }) => middlewares.use(route, handler));
      },
    },
  ],
});
