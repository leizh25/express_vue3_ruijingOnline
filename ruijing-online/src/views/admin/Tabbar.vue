<template>
  <van-tabbar v-model="active" @change="change">
    <van-tabbar-item icon="home-o">轮播图</van-tabbar-item>
    <van-tabbar-item icon="chat-o">留言板</van-tabbar-item>
    <van-tabbar-item icon="friends-o">好友</van-tabbar-item>
    <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
  </van-tabbar>
</template>
<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
const emit = defineEmits(["change"]);
const active = ref(0);
const change = n => {
  emit("change", active.value);
};
onMounted(() => {
  if (localStorage.getItem("page")) {
    active.value = localStorage.getItem("page") * 1;
  }
  document.title = "瑞景在线 - 后台管理";
});
</script>
<style lang="less" scoped></style>
