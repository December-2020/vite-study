/*
 * @Author: Komorebi
 * @Date: 2024-09-23 15:08:24
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-26 11:14:40
 */
import { createApp } from "vue";
import App from "./App.vue";
// 注册svg图标
import "virtual:svg-icons-register";
// 导入UnoCss
import "uno.css";
// 引入element内组件的暗色主题
import "element-plus/theme-chalk/dark/css-vars.css";
// 引入i18n
import { registerI18n } from "@/locales";
// 引入pinia
import { registerStore } from "@/store";


async function bootstrap() {
  const app = createApp(App);

  registerI18n(app);
  registerStore(app);

  app.mount("#app");
}

bootstrap();
