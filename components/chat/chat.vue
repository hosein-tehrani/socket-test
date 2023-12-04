import { Chat } from '#build/components';
<template>
  <div class="chat-container">
    <v-card height="calc(100vh - 170px)" flat>
      <v-card-title>
        <v-row class="justify-between align-center">
          <v-col>
            <h2>{{ header }}</h2>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: calc(100% - 40px); margin-bottom= 77px">
        <div class="chat-box" id="chat-box">
          <div
            v-for="(chat, i) in chats"
            :key="i"
            :class="i % 2 || 'text-left'"
          >
            <div
              v-if="chat.image"
              class="ma-4 image-box"
              :class="i % 2 && 'me'"
            >
              <v-img
                class="image"
                cover
                width="180px"
                height="180px"
                :src="`https://api.medcome.ir/files/support/` + chat.image"
                @click="zoom(chat.image)"
              ></v-img>

              <div class="caption">
                <div class="caption-time">
                  {{ persianDate(chat.createdAt) }}
                </div>
                <div class="caption-text">{{ chat.text }}</div>
              </div>
            </div>
            <div v-else class="ma-4 chat" :class="i % 2 && 'me'">
              {{ chat.text }}
              <div class="chat-time">
                {{ persianDate(chat.createdAt) }}
              </div>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <div v-if="message.image">
            <v-divider></v-divider>
            <div class="uploaded-image-box">
              <v-icon
                class="uploaded-image-box__close"
                @click="message.image = ''"
                icon="mdi-window-close"
              ></v-icon>
              <v-img
                class="image"
                width="140px"
                height="140px"
                :src="`https://api.medcome.ir/files/support/` + message.image"
                @click="zoom(message.image)"
              ></v-img>
            </div>
          </div>
          <div class="chat-input-imput">
            <div style="width: 58px" class="text-center upload-btn">
              <v-btn
                color="primary"
                density="default"
                icon="mdi-file-document-plus-outline"
                @click="$refs.file.click()"
                :disabled="progress"
              ></v-btn>
              <v-progress-circular
                v-if="progress"
                :model-value="progress"
                color="primary"
                class="upload-bar"
              ></v-progress-circular>
            </div>
            <v-text-field
              rounded
              variant="outlined"
              v-model="message.text"
              placeholder="متن خود را اینجا بنویسید"
              hide-details
            ></v-text-field>
            <div style="width: 58px" class="text-center send-btn">
              <v-btn
                color="primary"
                :disabled="!message.text || !message.image"
                density="default"
                icon="mdi-send-variant"
                @click="send"
              ></v-btn>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <input
      ref="file"
      type="file"
      style="display: none"
      accept="image/*"
      @change="upload"
    />
    <v-dialog @click="zoomDialog = false" v-model="zoomDialog" width="90vw">
      <v-img
        class="image"
        max-width="90vw"
        :src="`https://api.medcome.ir/files/support/` + selectedImage"
        @click="zoom(chat.image)"
      ></v-img>
    </v-dialog>
  </div>
</template>

<script>
import moment from "jalali-moment";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  name: "chat",
  data() {
    return {
      message: {
        text: "",
        image: "",
      },
      attachment: null,
      progress: 0,
      uploadedImg: "",
      zoomDialog: false,
      selectedImage: "",
    };
  },
  props: {
    header: {
      type: String,
      default: "درخواست ",
    },
    chats: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    persianDate(miladi) {
      console.log(miladi);
      if (miladi) {
        try {
          const a = miladi;
          const newDate = moment(a).locale("fa").format("HH:mm");
          return newDate;
        } catch (error) {
          return miladi;
        }
      }
    },
    zoom(img) {
      this.selectedImage = img;
      this.zoomDialog = true;
    },
    scrollToBottom() {
      var div = document.getElementById("chat-box");
      // Check if the div exists
      if (div) {
        // Scroll to the bottom of the div
        div.scrollTop = div.scrollHeight;
      }
    },
    async upload(e) {
      console.log("e", e);
      try {
        let file = e.target.files[0];
        if (!file) {
          return;
        }
        console.log("file", file);
        this.fileName = e.target.files[0].name;
        const formData = new FormData();
        formData.append("file", file);

        const response = await this.$axios.post(
          "/uploads/image/support",
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
        this.message.image = response.data.data.url;
      } catch (error) {
        this.progress = 0;
        toast.error(error, { autoClose: 3000 });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-container {
  max-width: 1200px;
  margin: 0 auto;
}
.chat-box {
  height: calc(100% - 40px);
  overflow-y: scroll;
  position: relative;
  padding-bottom: 40px;
  /* Define the scrollbar style */
  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  /* Define the thumb style */
  &::-webkit-scrollbar-thumb {
    background: #5e5d5d8e;
    border-radius: 5px;
  }
  /* Define the track style */
  &::-webkit-scrollbar-track {
    background-color: #dddddd3b;
  }
  .chat {
    border-radius: 0px 24px 24px 24px;
    background-color: var(--color-grey3);
    padding: 15px;
    max-width: 70%;
    min-width: 150px;
    display: inline-block;
    &-time {
      text-align: right;
      font-size: 12px;
    }
    &.me {
      border-radius: 24px 0px 24px 24px;
      background-color: var(--color-primary50);
      margin-right: auto;
      .chat-time {
        text-align: left !important;
      }
    }
  }
  .image-box {
    border-radius: 0px 24px 24px 24px;
    background-color: var(--color-grey3);
    padding: 4px;
    max-width: 70%;
    display: inline-block;
    .caption {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 8px 12px;
      &-time {
        font-size: 12px;
        width: 40px;
        text-align: right;
      }
    }
    .image {
      border-radius: 24px;
    }
    &.me {
      border-radius: 24px 0px 24px 24px;
      background-color: var(--color-primary50);
      margin-right: auto;
      .caption {
        flex-direction: row-reverse;
        &-time {
          text-align: left;
        }
      }
    }
  }
}
.chat-input {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: white;
  z-index: 2;
  padding: 10px;
  &-imput {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .uploaded-image-box {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    &__close {
      width: 58px;
      cursor: pointer;
    }
  }
}
.send-btn {
  transform: rotate(180deg);
}
.upload-btn {
  position: relative;
  .upload-bar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
