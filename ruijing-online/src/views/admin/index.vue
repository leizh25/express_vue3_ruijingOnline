<template>
  <First v-show="active == 0"></First>
  <Second v-show="active == 1"></Second>
  <Third v-show="active == 2"></Third>
  <Fourth v-show="active == 3"></Fourth>
  <Tabbar @change="change"></Tabbar>
</template>
<script setup>
import { ref } from "vue";
import First from "./First.vue";
import Second from "./Second.vue";
import Third from "./Third.vue";
import Fourth from "./Fourth.vue";

import Tabbar from "./Tabbar.vue";
import { onMounted } from "vue";

const active = ref(0);
onMounted(() => {
  active.value = localStorage.getItem("page") * 1 || 0;
});
const change = n => {
  active.value = n;
  localStorage.setItem("page", n);
};
</script>
<style lang="less" scoped></style>
