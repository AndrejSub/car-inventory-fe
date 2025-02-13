import "./assets/main.css";
import "@/assets/custom-bootstrap.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue-toast-notification/dist/theme-sugar.css";
import ToastPlugin from "vue-toast-notification";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(ToastPlugin);

app.mount("#app");
