<template>
  <div>
    <Head>
      <Title>پشتیبانی</Title>
    </Head>
    <v-card flat>
      <v-card-title>
        <div class="d-flex justify-space-between align-center">
          <h3>درخواست‌ها</h3>
          <v-btn
            rounded="xl"
            prepend-icon="mdi-plus-circle"
            color="primary"
            @click="openNewRequest"
            >ایجاد درخواست</v-btn
          >
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <data-table
          :loading="loading"
          @getRowData="goToChat($event)"
          :data="supports"
          :headers="headers"
          :statusItems="statusDic"
          :sectionItems="sections"
        />
      </v-card-text>
    </v-card>
    <v-dialog max-width="800" v-model="newRequestDialog">
      <v-card>
        <v-card-text>
          <h3 class="text-center mb-3">ایجاد درخواست</h3>
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-text-field
                variant="outlined"
                color="primary"
                v-model="newRequest.title"
                clearable
                label="عنوان درخواست"
                hide-spin-buttons
                hint="عنوان درخواست مورد نظر را وارد نمایید"
                persistent-hint
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-select
                variant="outlined"
                color="primary"
                v-model="newRequest.section"
                label="بخش"
                :items="sections"
                hint="بخش مورد نظر خود را انتخاب کنید"
              ></v-select>
            </v-col>
            <!-- <v-col cols="12" sm="12" md="6" lg="6">
              <fileUploader  
                label="بارگزاری فایل"
                hint="لطفاً فایل خود را بارگذاری نمایید"
                clearable
                @clearFile="newRequest.image = ''"
                @uploaded="(url) => newRequest.image = url"
                />
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-textarea
                variant="outlined"
                color="primary"
                label="متن درخواست"
                placeholder="متن خود را اینجا بنویسید..."
                v-model="newRequest.text"
              ></v-textarea>
            </v-col> -->
          </v-row>
          <v-divider></v-divider>
          <v-btn
            rounded="xl"
            variant="tonal"
            color="primary"
            @click="submitNewRequest"
            class="no-letter-space float-left ma-2"
            >ایجاد درخواست</v-btn
          >
          <v-btn
            rounded="xl"
            variant="outlined"
            color="grey3"
            @click="newRequestDialog = false"
            class="no-letter-space float-left ma-2"
            >انصراف</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DataTable from "~/components/common/DataTable.vue";
import fileUploader from "~/components/common/fileUploader.vue";
import moment from "jalali-moment";
export default {
  components: {
    DataTable,
    fileUploader,
  },
  data() {
    return {
      loading: false,
      newRequestDialog: false,
      newRequest: {
        section: "",
        title: "",
        // image:'',
        // text:'',
      },
      sections: [
        { title: "آزمایشگاه", value: 2 },
        { title: "مالی", value: 3 },
        { title: "فنی", value: 4 },
        { title: "علمی", value: 5 },
      ],
      supports: [],
      headers: [
        {
          title: "عنوان درخواست",
          align: "start",
          key: "title",
        },
        { title: "تاریخ", sortable: false, align: "start", key: "createdAt" },
        { title: "بخش", sortable: false, align: "start", key: "section" },
        { title: "وضعیت", sortable: false, align: "start", key: "status" },
        { title: "", sortable: false, align: "start", key: "details" },
      ],
      statusDic: [
        { color: "warning", text: "در انتظار پاسخ" },
        { color: "success", text: "بسته شده" },
      ],
      submitting: false,
    };
  },
  mounted() {
    this.getSupports();
  },
  methods: {
    goToChat(item) {
      this.$router.push({ path: `/backup/${item.id}` });
    },
    async getSupports() {
      console.log("getting 1");
      this.loading = true;
      try {
        const response = await this.$axios.get("/support");
        console.log("getting 2: ", response.data.data);
        this.supports = response.data.data;
      } catch (error) {
      } finally {
        console.log("getting 3");
        this.loading = false;
      }
    },
    openNewRequest() {
      this.newRequest = {
        section: "",
        title: "",
        // image:'',
        // text:'',
      };
      this.newRequestDialog = true;
    },
    async submitNewRequest() {
      this.submitting = true;
      try {
        const response = await this.$axios.post("/support", this.newRequest);
        this.getSupports();
        this.newRequestDialog = false;
      } catch (error) {
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
