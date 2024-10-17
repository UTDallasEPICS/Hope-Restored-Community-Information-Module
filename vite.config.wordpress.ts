import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { resolve } from "path";

export default defineConfig({
  resolve: { alias: [{ find: "~", replacement: resolve(__dirname, ".") }] },
  plugins: [vue()],
  server: {
    port: 4000,
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  base: "./",
});
