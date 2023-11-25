import "reset-css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//vant 组件
// import { showToast } from "vant";
import "vant/es/toast/style";
import 'vant/es/notify/style'

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
