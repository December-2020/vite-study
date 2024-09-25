/*
 * @Author: Komorebi
 * @Date: 2024-09-23 15:08:24
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-25 16:48:16
 */
import { createApp } from "vue";
import App from "./App.vue";
// 注册svg图标
import "virtual:svg-icons-register";
// 导入UnoCss
import "uno.css";
// 引入element内组件的暗合主题颜色
import "element-plus/theme-chalk/dark/css-vars.css";
// import "./styles/handle.scss";


createApp(App).mount("#app");
