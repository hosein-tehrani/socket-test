<template>
  <div>
    <Head>
      <Title>پشتیبانی</Title>
      <v-btn @click="send">send</v-btn>
    </Head>
    <chat header="عنوان درخواست" :chats="chats" />
  </div>
</template>

<script>
import chat from "~/components/chat/chat.vue";
export default {
  name: "interpretation-chat",
  data() {
    return {
      chats: [],
      socket: null,
    };
  },
  mounted() {
    const channelId = ""; //id
    const channelType = 0;
    // this.socket = this.$nuxtSocket({
    //   channel: `/${channelType}-${channelId}`,
    // });
    this.socket = this.$nuxtSocket({ name: "main" });
    // Subscribe
    this.socket.emit("subscribe", {
      channelType: `/messenger/${channelType}-${channelId}`,
    });
    this.getMessage();
  },
  methods: {
    async send() {
      console.log("socket2: ", this.socket);
      await this.socket.emit("sendMessage", "salam");
      console.log("sent!!");
    },
    async getMessage() {
      console.log("getting messages!!!");
      console.log("socket: ", this.socket);
      this.chats = await this.socket.on("receiveMessage", {
        id: `0-${this.$route.params.id}`,
      });
      onsole.log("getting messages: ", this.chats);
    },
    getChats(refresh = true) {
      this.chats = [
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          image: "b5f5fff21402094333e41225741d3be2-1695233740560.png",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          image: "b5f5fff21402094333e41225741d3be2-1695233740560.png",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
        {
          sender: "62cc7702a0c16b1c8fc52e7f",
          id: "641c38ffad7db112b23ac5c8",
          text: "سلام",
          image: "b5f5fff21402094333e41225741d3be2-1695233740560.png",
          createdAt: "2023-03-23T11:57:24.832Z",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
