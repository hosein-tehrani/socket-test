import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {
      wallet: 0,
    },
    userSet: false,
  }),
  getters: {},
  actions: {
    setUser(userData) {
      // userData.birthDate = userData.birthDate.slice(0, 9)
      this.userData = userData;
        const birth = this.userData.birthDate?.slice(0, 10);
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      const persianDate = userData.birthDate
        ? new Date(userData.birthDate).toLocaleDateString("fa-IR", options)
        : "";
      this.userData.birthDate = birth;
      this.userData.persianDate = persianDate;
      this.userSet = true;
    },
    async directChange(axios, payload) {
      try {
        const response = await axios.put("/user", payload);
        this.userData = response.data.data;
      } catch (error) {
        console.log("ERROR IS : ", error);
      }
    },
  },
});
