import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  vite: {
    server: {
      // --------------------------------------------------------
      // This is needed for coding in Windows with WSL2 + Docker
      // but this will lead to high CPU usage
      // However, it is not needed if you are coding directly in WSL2
      // So, you can comment this out if not needed
      // Source: https://vite.dev/config/server-options
      // --------------------------------------------------------
      // watch: { usePolling: true, interval: 1000 },
      // --------------------------------------------------------
      hmr: { protocol: "ws", host: "0.0.0.0", port: 24678 },
    },
  },
});
