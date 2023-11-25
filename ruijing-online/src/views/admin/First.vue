<template>
  <div>
    <van-cell title="轮播图管理" style="background-color: #bfa;" />
    <van-uploader
      v-model="fileList"
      multiple
      :after-read="afterRead"
      @delete="beforeDelete"
    />
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import request from "@/utils/request";
import { showNotify } from "vant";
import { onBeforeMount } from "vue";

const fileList = ref([]);

const afterRead = async e => {
  console.log(e instanceof Array);
  // 创建一个FormData对象
  const formData = new FormData();
  if (e instanceof Array) {
    //多文件
    console.log(e.length);
    for (const fileObj of e) {
      formData.append("file", fileObj.file); // 将文件添加到FormData中，file是一个File对象
    }
  } else {
    //一个文件
    formData.append("file", e.file); // 将文件添加到FormData中，file是一个File对象
  }
  const res = await request.post("/banners", formData);
  if (res.code === 200) {
    showNotify({
      type: "success",
      message: `上传图片成功`,
    });
  } else {
    showNotify({
      type: "danger",
      message: `上传图片失败`,
    });
  }
};
const getImgs = async () => {
  const res = await request.get("/banners");
  //   console.log("res: ", res);
  if (res.code == 200) {
    fileList.value = res.data;
  }
};

onBeforeMount(async () => {
  //登录时间超过一小时,返回主页
  const lastLoginTime = localStorage.getItem("token") || 0;
  if (Date.now() - lastLoginTime > 1000 * 60 * 60) {
    window.location.href = "/#/";
  } else {
    await getImgs();
  }
});
//删除文件
const beforeDelete = async e => {
  //   console.log(e);
  const res = await request.delete(`/banners/${e.name}`);
  //   console.log("res: ", res);
  if (res.code == 200) {
    showNotify({
      type: "danger",
      message: `删除${res.data.name.split(".")[0]}成功`,
    });
  } else {
    showNotify({
      type: "danger",
      message: `删除失败`,
    });
  }
};
</script>
<style lang="less" scoped></style>
