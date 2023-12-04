<template>
  <div>
    <v-text-field
      variant="outlined"
      color="primary"
      v-model="fileName"
      :label="label"
      :hint="hint"
      @click="$refs.file.click()"
      :clearable="clearable"
      @click:clear="deleteFile"
      :readonly="readonly"
      append-inner-icon="mdi-file-upload-outline"
    ></v-text-field>
    <input
      ref="file"
      type="file"
      style="display: none"
      accept="image/*, .pdf"
      :disabled="readonly"
      @change="upload"
    />
  </div>
</template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  props: {
    target: {
      type: String,
      required: true,
      default: "lab",
    },
    label: {
      type: String,
      required: true,
    },
    hint: {
      type: String,
      required: false,
    },
    clearable: {
      type: Boolean,
      required: false,
      default: false,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      fileName: "",
      progress: "",
    };
  },
  methods: {
    async upload(e) {
      try {
        let file = e.target.files[0];
        if (!file) {
          return;
        }
        this.fileName = e.target.files[0].name;
        const formData = new FormData();
        formData.append("file", file);

        const response = await this.$axios.post(
          "/uploads/image/" + this.target,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              this.progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            },
          }
        );
        this.progress = 0;
        this.$emit("uploaded", response.data.data.url);
      } catch (error) {
        this.progress = 0;
        toast.error(error, { autoClose: 3000 });
      }
    },
    deleteFile() {
      this.fileName = "";
      this.$emit("clearFile");
    },
  },
};
</script>
<style lang="scss" scoped></style>
