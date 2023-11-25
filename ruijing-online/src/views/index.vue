<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(item, index) in fileList"
        :key="index"
        @click="showNotify({ type: 'success', message: `爱老虎油` })"
      >
        <img :src="item.url" :alt="item.name" />
      </van-swipe-item>
    </van-swipe>
    <van-cell>
      <template #title>
        <span @dblclick="openLogin">留言板</span>
      </template>
      <template #right-icon>
        <div @click="addMsg">
          <van-icon name="plus" class="plus-icon" />
          <span>添加留言</span>
        </div>
      </template>
    </van-cell>
    <!-- 留言板 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell v-for="item in list" :key="item.id" :title="item.content" :label="item.time" />
    </van-list>
    <!-- 弹框 -->
    <van-popup
      v-model:show="showPopup"
      closeable
      close-icon="close"
      position="top"
      style="opacity: 0.85; padding-top: 40px"
      :style="{ height: '50%' }"
    >
      <template #default>
        <!-- 留言表单 -->
        <van-form v-show="scene == 1">
          <van-cell-group>
            <van-field
              v-model="content"
              type="textarea"
              name="内容"
              label="留言"
              placeholder="推荐留言格式: 内容 --留言人"
              rows="4"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button
              round
              block
              type="primary"
              native-type="submit"
              @click="submit"
            >
              提交
            </van-button>
          </div>
        </van-form>
        <!-- 登录表单 -->
        <van-form v-show="scene == 2">
          <van-cell-group inset>
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button
              round
              block
              type="primary"
              native-type="submit"
              @click="goAdmin"
            >
              提交
            </van-button>
          </div>
        </van-form>
      </template>
    </van-popup>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import request from "@/utils/request";
import { ref } from "vue";
import { showNotify } from "vant";

const fileList = ref([]);
//留言板相关
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const showPopup = ref(false);
const content = ref("");
const scene = ref(1);
const username = ref("");
const password = ref("");

const getImgs = async () => {
  const res = await request.get("/banners");
  //   console.log("res: ", res);
  if (res.code == 200) {
    fileList.value = res.data;
  }
};
const getList = async () => {
  const res = await request.get("/messages");
  //   console.log("res: ", res);
  if (res.code == 200) {
    list.value = res.data.reverse();
  }
};

onMounted(async () => {
  try {
    await getImgs();
  } catch (error) {
    showNotify({
      type: "danger",
      message: `暂无图片`,
    });
  }
  try {
    await getList();
    showNotify({
      type: "success",
      message: `初始化成功`,
    });
    // 加载状态结束
    loading.value = false;
    // 数据全部加载完成
    finished.value = true;
  } catch (error) {
    showNotify({
      type: "danger",
      message: `初始化失败`,
    });
  }
});
//添加留言按钮
const addMsg = () => {
  scene.value = 1;
  showPopup.value = true;
};
//提交留言
const submit = async () => {
  try {
    const res = await request.post("/messages", {
      content: content.value,
    });
    // console.log("content.value: ", content.value);
    if (res.code == 200) {
      showPopup.value = false;
      showNotify({
        type: "success",
        message: `提交成功`,
      });
      getList();
      content.value = "";
    }
  } catch (error) {
    showNotify({
      type: "danger",
      message: `提交失败`,
    });
  }
};

//跳转到管理员页面
const openLogin = async () => {
  scene.value = 2;
  showPopup.value = true;
  username.value = "";
  password.value = "";
};
const goAdmin = async () => {
  const res = await request.post("/login", {
    username: username.value,
    password: password.value,
  });
  if (res.code === 200) {
    localStorage.setItem("token", Date.now());
    window.location.href = "/#/admin";
  } else {
    showNotify({
      type: "danger",
      message: `${res.msg}`,
    });
  }
};
</script>
<style lang="less" scoped>
.my-swipe .van-swipe-item {
  width: 100%;
  height: 400px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  img {
    width: 100%;
    height: 100%;
  }
}
.search-icon {
  font-size: 16px;
  line-height: inherit;
}
</style>
