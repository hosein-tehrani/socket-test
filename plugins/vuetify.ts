import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { fa } from "vuetify/locale";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    locale: {
      locale: "fa",
      fallback: "fa",
      messages: { fa },
      rtl: { fa: true },
    },
    components,
    directives,
    theme: {
      // options: { variations: false, customProperties: true },
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#26a69a",
            primary700: "#00897b",
            primary50: "#e0f2f1",
            secondary: "#ff2056",
            secondary50: "#ffebee",
            success: "#13ce66",
            info: "#1fb6ff",
            warning: "#fbbc04",
            grey1: "#5f6368",
            grey2: "#84898D",
            grey3: "#c5c5c5",
            grey4: "#eceff1",
            grey_background: "#f9f9f9",
          },
        },
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
