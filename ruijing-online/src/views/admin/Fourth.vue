<template>
  <div>
    <van-cell
      title="管理员设置-添加管理员"
      value=""
      style="background-color: #bfa"
    ></van-cell>
    <van-form>
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
          @click="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import request from "../../utils/request";
import { showNotify } from "vant";

const username = ref("");
const password = ref("");
const submit = async () => {
  if (username.value && password.value) {
    //注册用户
    const res = await request.post("/register", {
      username: username.value.trim(),
      password: password.value.trim(),
    });
    if (res.code === 200) {
      showNotify({
        type: "success",
        message: `注册成功`,
      });
      username.value = "";
      password.value = "";
    }
  }
};
</script>
<style lang="less" scoped></style>
