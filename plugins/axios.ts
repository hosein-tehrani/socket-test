import axios from "axios";
import Cookie from "js-cookie";
export default defineNuxtPlugin((nuxtApp) => {
  let api = axios.create({
    baseURL: "https://api.medcome.ir",
    headers: {
      common: {
        Authorization: `Bearer ${Cookie.get("token") ?? ""}`,
      },
    },
  });
  return {
    provide: {
      axios: api,
    },
  };
});
