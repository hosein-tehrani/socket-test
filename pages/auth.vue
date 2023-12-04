<template>
  <div class="custom-container">
    <v-row justify="center" align="center">
      <v-col class="d-flex align-center pa-10" cols="12" md="4">
        <div style="width: 100%">
          <v-tabs
            align-tabs="center"
            class="d-flex justify-center"
            v-model="tab"
            color="primary">
            <v-tab class="no-letter-space" value="login">ورود</v-tab>
            <v-tab class="no-letter-space" value="signup">ثبت نام</v-tab>
          </v-tabs>
          <v-window v-model="tab" class="py-5">
            <!--Login-->
            <v-window-item value="login">
              <div v-if="stepper > 1" class="d-flex justify-space-between mb-2">
                <p class="phone-text text-grey1">
                  شماره همراه :‌ {{ phoneNumber }}
                </p>
                <p
                  style="cursor: pointer"
                  @click="stepper -= 1"
                  class="text-error phone-text">
                  اصلاح
                </p>
              </div>
              <!--Phone Number-->
              <v-text-field
                color="primary"
                v-if="stepper === 1"
                type="number"
                prepend-inner-icon="mdi-phone"
                v-model="phoneNumber"
                clearable
                hide-details
                label="تلفن همراه"
                @keydown.enter="setStepper"
                variant="outlined"></v-text-field>
              <!--Password-->
              <v-text-field
                color="primary"
                v-else-if="stepper === 2"
                prepend-inner-icon="mdi-phone"
                type="password"
                v-model="password"
                clearable
                hide-details
                label="رمز عبور"
                @keydown.enter="loginWithPassword"
                variant="outlined"></v-text-field>
              <!--OTP Code-->
              <v-text-field
                color="primary"
                v-else-if="stepper === 3"
                prepend-inner-icon="mdi-phone"
                type="password"
                v-model="code"
                clearable
                hide-details
                @keydown.enter="loginWithOtp"
                label="کد پیامک شده"
                variant="outlined"></v-text-field>
              <!--Texts under input-->
              <p class="phone-text text-grey1 mt-2">
                {{
                  stepper === 1
                    ? "شماره همراه خود را وارد کنید"
                    : stepper === 2
                    ? "رمز عبور خود را وارد نمائید"
                    : "کد پیامک شده را وارد نمائيد"
                }}
              </p>
              <p
                v-if="stepper === 2"
                style="font-size: 14.4; font-weight: 400; cursor: pointer"
                class="mt-6 text-grey1"
                @click="activeOtp">
                ورود با رمز یک بار مصرف
              </p>
              <!--Check Phone Number-->
              <v-btn
                v-if="stepper === 1"
                height="44px"
                width="100%"
                class="elevation-0 mt-10 rounded-xl no-letter-space"
                color="primary"
                @click="setStepper"
                >ورود</v-btn
              >
              <!--Login With Password-->
              <v-btn
                v-else-if="stepper === 2"
                height="44px"
                :loading="loading"
                width="100%"
                class="elevation-0 mt-10 rounded-xl no-letter-space"
                color="primary"
                @click="loginWithPassword"
                >تایید</v-btn
              >
              <!--Login With OTP-->
              <v-btn
                v-else-if="stepper === 3"
                height="44px"
                :loading="loading"
                width="100%"
                class="elevation-0 mt-10 rounded-xl no-letter-space"
                color="primary"
                @click="loginWithOtp"
                >ورود با رمز یکبار مصرف</v-btn
              >
              <p class="phone-text text-grey1 mt-6 text-center">
                کاربر جدید هستید؟
                <span
                  class="text-primary phone-text"
                  style="cursor: pointer"
                  @click="tab = 1"
                  >ثبت نام کنید</span
                >
              </p>
            </v-window-item>
            <!--Sign Up-->
            <v-window-item value="signup">
              <!--First Name And Last Name And Phone Number-->
              <div class="d-flex align-center">
                <div
                  :class="registerStepper === 1 ? 'bg-primary' : 'bg-grey3'"
                  class="stepper-title">
                  <p class="text-white">1</p>
                </div>
                <h3
                  :class="registerStepper === 1 ? 'text-black' : 'text-grey1'"
                  class="mx-2">
                  ایجاد حساب
                </h3>
              </div>
              <!--First Name And Last Name-->
              <div class="stepper-box">
                <div
                  :style="
                    registerStepper === 1 ? 'display : block' : 'display : none'
                  ">
                  <v-text-field
                    color="primary"
                    prepend-inner-icon="mdi-account"
                    v-model="firstAndLast"
                    clearable
                    hide-details
                    label="نام و نام خانوادگی"
                    variant="outlined"></v-text-field>
                  <p class="phone-text mt-2 text-grey1">
                    لطفاً نام و نام خانوادگی خود را وارد نمایید.
                  </p>
                  <!--Phone Number-->
                  <v-text-field
                    color="primary"
                    class="mt-4"
                    type="number"
                    prepend-inner-icon="mdi-phone"
                    v-model="regPhoneNumber"
                    clearable
                    hide-details
                    label="تلفن همراه"
                    variant="outlined"></v-text-field>
                  <p class="phone-text mt-2 text-grey1">
                    لطفاً شمارۀ همراه خود را وارد نمایید.
                  </p>
                </div>
              </div>
              <!--Active Account-->
              <div class="d-flex align-center">
                <div
                  :class="registerStepper === 2 ? 'bg-primary' : 'bg-grey3'"
                  class="stepper-title">
                  <p class="text-white">2</p>
                </div>
                <h3
                  :class="registerStepper === 2 ? 'text-black' : 'text-grey1'"
                  class="mx-2">
                  فعال سازی حساب
                </h3>
              </div>
              <div class="stepper-box">
                <div
                  :style="
                    registerStepper === 2 ? 'display : block' : 'display : none'
                  ">
                  <v-text-field
                    color="primary"
                    class="mt-4"
                    type="number"
                    prepend-inner-icon="mdi-check"
                    v-model="regCode"
                    clearable
                    hide-details
                    label="کد تایید"
                    variant="outlined"></v-text-field>
                  <p class="phone-text mt-2 text-grey1">
                    لطفاً کد تأیید پیامک شده را وارد نمایید.
                  </p>
                  <div class="d-flex justify-end">
                    <v-btn
                      color="primary50"
                      class="text-primary elevation-0 rounded-xl no-letter-space mt-2"
                      >ارسال مجدد کد</v-btn
                    >
                  </div>
                </div>
              </div>
              <!--Set Password-->
              <div class="d-flex align-center">
                <div
                  :class="registerStepper === 3 ? 'bg-primary' : 'bg-grey3'"
                  class="stepper-title">
                  <p class="text-white">3</p>
                </div>
                <h3
                  :class="registerStepper === 3 ? 'text-black' : 'text-grey1'"
                  class="mx-2">
                  انتخاب رمز عبور
                </h3>
              </div>
              <div
                :style="
                  registerStepper === 3 ? 'display : block' : 'display : none'
                ">
                <v-text-field
                  color="primary"
                  class="mt-4"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  v-model="regPassword"
                  clearable
                  hide-details
                  label="رمز عبور"
                  variant="outlined"></v-text-field>
                <p class="phone-text mt-2 text-grey1">
                  لطفاً رمزعبور خود را وارد نمایید.
                </p>
              </div>
              <!--Set First Name And Last Name-->
              <v-btn
                v-if="registerStepper === 1"
                :loading="regLoading"
                height="44px"
                width="100%"
                class="elevation-0 rounded-xl mt-6 no-letter-space"
                color="primary"
                @click="register"
                >ثبت نام</v-btn
              >
              <!--Active User Account-->
              <v-btn
                v-else-if="registerStepper === 2"
                :loading="regLoading"
                height="44px"
                width="100%"
                class="elevation-0 rounded-xl mt-6 no-letter-space"
                color="primary"
                @click="activeAccount"
                >فعال سازی</v-btn
              >
              <!--Set Password-->
              <v-btn
                v-else-if="registerStepper === 3"
                :loading="regLoading"
                height="44px"
                width="100%"
                class="elevation-0 rounded-xl mt-6 no-letter-space"
                color="primary"
                @click="setPassword"
                >تنطیم کلمه عبور</v-btn
              >
              <!--Have An Account? Log In-->
              <p class="text-center phone-text text-grey1 mt-6">
                از قبل حساب دارید؟
                <span
                  style="cursor: pointer"
                  class="text-primary"
                  @click="tab = 0"
                  >وارد شوید</span
                >
              </p>
            </v-window-item>
          </v-window>
        </div>
      </v-col>
      <v-col v-if="isMobile" class="pa-10" cols="12" md="8">
        <div class="bg-primary50 rounded-xl pa-5 d-flex align-center">
          <v-img src="https://assets.medcome.ir/img/auth/login.svg" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Cookie from "js-cookie";
definePageMeta({
  layout: "authentication",
});
export default {
  data() {
    return {
      regLoading: false, // Sign up
      registerStepper: 1, // Sign up
      regPhoneNumber: null, // Sign up
      regCode: null, // Sign up
      regPassword: null, // Sign up
      firstAndLast: null, // Sign up
      phoneNumber: null, // Sign in
      password: null, // Sign in
      stepper: 1, // Sign in
      tab: null, // Sign in
      code: null, // Sign in
      loading: false, // Sign in
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.display.mdAndUp;
    },
  },
  methods: {
    // Sign in
    setStepper() {
      // First Step
      if (this.stepper === 1 && this.phoneNumber !== null) {
        this.stepper = 2;
      }
      // Second Step
    },

    // Sign in
    async activeOtp() {
      this.loading = true;
      try {
        await this.$axios.post("/auth/loginWithPhone", {
          phone: this.phoneNumber,
        });
        toast.success("کد فعال سازی با موفقیت ارسال شد", { autoClose: 3000 });
        this.stepper = 3;
      } catch (error) {
        toast.error("ارسال کد با شکست مواجه شد", { autoClose: 3000 });
      } finally {
        this.loading = false;
      }
    },

    // Sign in
    async loginWithPassword() {
      if (this.phoneNumber !== null && this.password !== null)
        try {
          this.loading = true;
          const response = await this.$axios.post("/auth/login", {
            phone: this.phoneNumber,
            password: this.password,
          });
          Cookie.set("token", response.data.data.token);
          location.replace("/");
        } catch (error) {
          toast.error("شماره همراه یا رمز عبور نادرست است", {
            autoClose: 3000,
          });
        } finally {
          this.loading = false;
        }
    },

    // Sign in
    async loginWithOtp() {
      try {
        const response = await this.$axios.post("/auth/activateLogin", {
          activeCode: Number(this.code),
          phone: this.phoneNumber,
        });
        Cookie.set("token", response.data.data.token);
        location.replace("/");
      } catch (error) {
        toast.error("کد وارد شده نادرست است", {
          autoClose: 3000,
        });
      }
    },
    // Sign up
    async register() {
      if (this.firstAndLast && this.regPhoneNumber)
        try {
          this.regLoading = true;
          await this.$axios.post("/auth/signup", {
            phone: this.regPhoneNumber,
            name: this.firstAndLast,
            role: "patient",
          });
          this.registerStepper = 2;
          toast.success("کد فعال سازی با موفقیت ارسال شد", { autoClose: 3000 });
        } catch (error) {
          toast.error("ارسال کد با شکست مواجه شد", { autoClose: 3000 });
        } finally {
          this.regLoading = false;
        }
    },

    // Sign up
    async activeAccount() {
      if (this.regCode)
        try {
          this.regLoading = true;
          const response = await this.$axios.post("/auth/activate", {
            activeCode: Number(this.regCode),
            phone: this.regPhoneNumber,
          });
          console.log("RESPONSE IS : ", response);
          // Set Cookie
          Cookie.set("token", response.data.data.token);
          this.registerStepper = 3;
          toast.success("لطفا رمز عبور خود را انتخاب نمائيد", {
            autoClose: 3000,
          });
        } catch (error) {
          toast.error(error);
          console.log(error);
        } finally {
          this.regLoading = false;
        }
    },

    // Sign up
    setPassword() {
      try {
        console.log("TOKEN IS : ", Cookie.get("token"));
        this.$axios.put(
          "/auth/password",
          { password: this.regPassword },
          { headers: { Authorization: `Bearer ${Cookie.get("token")}` } }
        );
        toast.success("پسورد با موفقیت تنظیم شد", { autoClose: 3000 });
        location.replace("/");
      } catch (error) {
        toast.error("تنظیم پسورد با شکست مواجه شد", { autoClose: 3000 });
      }
    },
  },
};
</script>
<style scoped>
.custom-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.phone-text {
  font-weight: 400;
  font-size: 12px;
}
.stepper-box {
  border-right: 1px solid var(--color-grey3);
  margin-right: 15px;
  padding: 10px;
}
.stepper-title {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
