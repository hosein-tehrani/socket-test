<template>
  <v-img
    class="mb-1"
    :src="outlined ? baseUrlOutLined + name + '.svg' : baseUrl + name + '.svg'"
    :max-width="width"
    :min-width="width"
  ></v-img>
</template>
<script setup>
///////////// imports
import { ref } from 'vue';

///////////// props
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: false,
    default: '20px',
  },
  outlined: {
    type: Boolean,
    required: false,
    default: false,
  },
});

///////////// data
const baseUrl = ref('https://assets.medcome.ir/icons/sax/bold/');
const baseUrlOutLined = ref('https://assets.medcome.ir/icons/sax/outline/');
</script>
