<template>
  <v-data-table
    :show-select="showSelect"
    :return-object="showSelect"
    :loading="loading"
    select-strategy="single"
    v-model="selected"
    :key="data"
    hide-default-footer
    :hide-header="hideHeader"
    :items-per-page="selectedItemInList"
    :headers="headers"
    :items="data"
    :page="page"
    item-value="name"
    class="elevation-0"
  >
    <!-- Status Color Manager-->
    <template #[`item.status`]="{ item }">
      <v-btn
        :color="statusItems[item.columns.status].color"
        class="rounded-xl elevation-0 text-white"
        >{{ statusItems[item.columns.status].text }}</v-btn
      >
    </template>
    <template #[`item.lab-username`]="{ item }">
      {{ getUser(item) }}
    </template>
    <template #[`item.section`]="{ item }">
      {{ sectionItems[item.columns.section].title }}
    </template>
    <template #[`item.selected`]="{ item }">
      <v-radio
        color="primary"
        @click="$emit('select', item)"
        v-model="item.columns.selected"
      ></v-radio>
    </template>
    <template #[`item.type`]="{ item }">
      {{ typeText(item) }}
    </template>
    <!--Get Row Info-->
    <template #[`item.details`]="{ item }">
      <v-btn
        color="grey100"
        class="rounded-xl elevation-0"
        @click="sendRowInfo(item)"
        >جزئیات</v-btn
      >
    </template>
    <template #[`item.sampler`]="{ item }">
      {{ item.columns.sampler ? item.columns.sampler : "---" }}
    </template>
    <template #[`item.edit`]="{ item }">
      <v-icon color="grey2" @click="sendRowInfo(item)">mdi-pencil</v-icon>
    </template>
    <!--Make Dates Persian-->
    <template #[`item.createdAt`]="{ item }">
      <p>
        {{ persianDate(item.columns.createdAt) }}
      </p>
    </template>
    <!--Change Default Footer-->
    <template #bottom>
      <v-divider v-if="!hideFooter"></v-divider>
      <v-row v-if="!hideFooter" class="mt-2" justify="space-between">
        <!--Item Per Page-->
        <div class="d-flex align-center">
          <p class="mx-3">نمایش در هر صفحه</p>
          <v-select
            hide-details
            style="width: 85px"
            class="rounded-lg align-center"
            variant="outlined"
            dense
            v-model="selectedItemInList"
            :items="itemsPerPageList"
            @change="changeItemsNumber"
          />
        </div>
        <!--Pagination-->
        <div>
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="length"
              :total-visible="isMobile ? 2 : 4"
              @change="changePage"
            />
          </div>
        </div>
      </v-row>
    </template>
  </v-data-table>
</template>
<script>
import moment from "jalali-moment";
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";
export default {
  components: {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    // length: {
    //   type: Number,
    //   required: true,
    // },
    showSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideFooter: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    sectionItems: {
      type: Array,
      required: false,
      default: [
        // sections for backup
        { title: "آزمایشگاه", value: 2 },
        { title: "مالی", value: 3 },
        { title: "فنی", value: 4 },
        { title: "علمی", value: 5 },
      ],
    },
    packageItems: {
      type: Array,
      required: false,
      default: [],
    },
    statusItems: {
      type: Array,
      required: false,
      default: [
        { color: "error", text: "لغو شده", enText: "cancelled" },
        { color: "info", text: "استعلام", enText: "inquiry" },
        { color: "info", text: "پرداخت", enText: "not_paid" },
        { color: "success", text: "پرداخت شده", enText: "paid" },
        { color: "info", text: "درحال انجام", enText: "in_progress" },
        { color: "info", text: "انتخاب نمونه‌گیر", enText: "choosing_sampler" },
        { color: "info", text: "در آزمایشگاه", enText: "in_lab" },
        { color: "secondary", text: "در انتظار جواب", enText: "not_respond" },
        { color: "primary", text: "دانلود جواب", enText: "responded" },
      ],
    },
  },
  data() {
    return {
      itemsPerPageList: [5, 10, 15, 20], // How many items should show in table ?
      selectedItemInList: 10, // What is user choice ?
      page: 1, // User current page
      selected: [],
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.display.mdAndDown;
    },
    length() {
      console.log("data.length: ", this.data.length);
      console.log("selectedItemInList: ", this.selectedItemInList);
      console.log(
        "returned: ",
        Math.floor(this.data.length / this.selectedItemInList)
      );
      return Math.floor(this.data.length / this.selectedItemInList);
    },
  },
  watch: {
    selected(val) {
      this.$emit("select", val[0]);
    },
  },
  methods: {
    getUser(item) {
      const user = item.raw.is_owner
        ? item.raw.user?.name
        : item.raw.patient?.name;
      return user ? user : "---";
    },
    select(val) {
      this.$emit("select", val[0]);
    },
    // Convert miladi date to jalali date :-D
    persianDate(miladi) {
      if (miladi) {
        try {
          const a = miladi.slice(0, 10);
          const newDate = moment(a, "YYYY/MM/DD")
            .locale("fa")
            .format("YYYY/MM/DD");
          return newDate;
        } catch (error) {
          console.log("ERR IS : ", error);
        }
        return miladi;
      }
    },
    // Send Row Info
    sendRowInfo(item) {
      console.log("getRowData", item.raw);
      this.$emit("getRowData", item.raw);
    },
    typeText(item) {
      const raw = item.raw;
      if (raw.type == 0) {
        return "نسخه آنلاین";
      } else if (raw.type == 1) {
        return "نسخه کاغذی";
      } else {
        if (this.packageItems.length) {
          const category = this.packageItems.filter(
            (cat) => cat.id === raw.packages
          );
          return category.length ? category[0].name : "پکیج";
        } else {
          return "پکیج";
        }
      }
    },
    // Change number of table items
    changeItemsNumber() {
      console.log("ITEM IS : ", selectedItemInList);
    },
    // When user decide to change page
    changePage() {
      console.log("PAGE CHANGED!!!");
      this.$emit("pageChanged", this.page);
    },
  },
};
</script>
