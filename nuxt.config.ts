import { defineNuxtConfig } from 'nuxt/config'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    baseURL: '/',
  },
  routeRules: {
    '/api/**': { ssr: false }, // This rule ensures that API routes are handled server-side
  },
});
