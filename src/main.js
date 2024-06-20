import { createApp } from "vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import { Button, Descriptions, Upload } from "ant-design-vue";

createApp(App).use(Descriptions).use(Upload).mount("#app");
