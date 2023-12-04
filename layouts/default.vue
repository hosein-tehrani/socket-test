<template>
  <v-app>
    <v-main style="background-color: #f9f9f9">
      <div class="main-container">
        <slot />
      </div>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useUserStore } from "~/stores/user";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  mounted() {
    this.getUserInfo();
  },
  computed: {
    ...mapState(useUserStore, ["userData"]),
  },
  methods: {
    ...mapActions(useUserStore, ["setUser"]),
    async getUserInfo() {
      try {
        const response = await this.$axios.get("/user");
        console.log("RESPONSEEE IS :", response);
        this.setUser(response.data.data);
      } catch (error) {
        console.log("ERR IS : ", error);
        toast.error("دریافت اطلاعات کاربری با شکست مواجه شد");
        this.$router.push("/auth");
      }
    },
  },
};
</script>
<style scoped>
.customContainer {
  width: 100%;
  min-height: 100vh;
  z-index: 1000;
  background-color: #f9f9f9;
  position: relative;
  padding: 10px 12px;
}
.main-container {
  margin: 0 auto;
  max-width: 1200px;
  background-color: #f9f9f9;
}
</style>
