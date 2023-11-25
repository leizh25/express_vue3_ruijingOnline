<template>
  <div>
    <van-cell title="留言板管理" style="background-color: #bfa" />
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
    >
      <van-cell v-for="item in list" :key="item.id" :title="item.content">
        <template #default>
          <van-button type="danger" size="mini" @click="deleteMessage(item.id)"
            >删除</van-button
          >
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
<script setup>
import { ref } from "vue";
import request from "../../utils/request";
import { onMounted } from "vue";
import { showNotify } from "vant";

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const getList = async () => {
  const res = await request.get("/messages");
  //   console.log("res: ", res);
  if (res.code == 200) {
    list.value = res.data.reverse();
  }
  finished.value = true;
  loading.value = false;
};
onMounted(() => {
  getList();
});

const deleteMessage = async id => {
  console.log("id: ", id);
  const res = await request.delete(`/messages/${id}`);
  //   console.log("res: ", res);
  if (res.code == 200) {
    showNotify({
      type: "danger",
      message: `删除成功`,
    });
    getList();
  } else {
    showNotify({
      type: "danger",
      message: `删除失败`,
    });
  }
};
</script>
<style lang="less" scoped></style>
