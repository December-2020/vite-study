/*
 * @Author: Komorebi
 * @Date: 2024-09-23 15:08:24
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-29 16:11:28
 */
import { createApp } from "vue";
import App from "./App.vue";

// 统一浏览器的样式
import "normalize.css/normalize.css";
// 注册svg图标
import "virtual:svg-icons-register";
// element plus 调用api需要引入
import "element-plus/es/components/message/style/css";
// 导入UnoCss
import "virtual:uno.css";
// 引入element内组件的暗色主题
import "element-plus/theme-chalk/dark/css-vars.css";
// 引入i18n
import { registerI18n } from "@/locales";
// 引入pinia
import { registerStore } from "@/store";
// 引入router
import { registerRouter } from "@/router";

/**
 * * 因为在input基础组件中使用了
 * * import { ElInput } from "element-plus";
 * * 所以需额外引入样式
 */
import "element-plus/theme-chalk/el-input.css";
import "element-plus/theme-chalk/el-button.css";

async function bootstrap() {
  const app = createApp(App);

  registerI18n(app);
  registerStore(app);
  registerRouter(app);

  app.mount("#app");
}

bootstrap();
