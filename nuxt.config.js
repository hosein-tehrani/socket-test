// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
  },
  devServer: {
    host: "medcome.dev",
    port: 8000,
  },
  // modules: ['@nuxtjs/axios'],
  pages: true,
  // modules: ["nuxt-icon"],
  typescript: {
    shim: false,
  },
  css: [
    "@mdi/font/css/materialdesignicons.min.css",
    "vuetify/lib/styles/main.sass",
    "@/assets/scss/main.scss",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    server: {
      hmr: {
        overlay: false, // Disable the HMR overlay
      },
    },
    ssr: {
      noExternal: ["vuetify"],
    },
  },
  modules: ["@pinia/nuxt", "nuxt-socket-io"],
  io: {
    // module options
    sockets: [
      {
        name: "main",
        url: "https://api.medcome.ir",
        default: true,
      },
    ],
  },
});
