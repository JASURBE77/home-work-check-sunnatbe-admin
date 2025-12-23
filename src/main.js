import { createApp } from "vue";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./routers/router";
import "./assets/styles/main.css";
import i18nFactory from "./utils/helpers/i18n/index.js";

const app = createApp(App);
const i18n = i18nFactory();

app.use(i18n.global);
app.use(i18n);

app.use(createPinia());
app.use(Antd);
app.use(router);
app.mount("#app");
