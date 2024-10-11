<!--
 * @Author: Komorebi
 * @Date: 2024-09-23 15:08:24
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-11 09:50:57
-->
<template>
  <el-config-provider :locale="locale">
    <router-view v-element-size="onResize" class="h-100vh"/>
  </el-config-provider>
</template>

<script setup lang="ts">
// 引入 element-plus 中的语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { vElementSize } from "@vueuse/components";
// pinia中使用解构
import { storeToRefs } from "pinia";
import store from "@/store";
import { LanguageEnum, DeviceEnum } from "@/enums/app";

// 对 element UI 中的组件使用国际化
const elFile = {
  [LanguageEnum.CHINESE]: zhCn,
  [LanguageEnum.ENGLISH]: en,
};
const locale = computed(() => {
  const { lang } = storeToRefs(store.appSet);
  return elFile[lang.value];
});
// 判断移动端还是pc端
// console.log(navigator.userAgent, "userAgent");
/**
 * 判断移动端还是pc端
 * navigator.userAgent
 * 检测是否包含 iPhone iPad iPod Android 这些关键字
 * 如果包含则是移动端
 * 该方法并不100%准确
 * 因为用户可以pc浏览器模拟手机ua
 * 也能使用移动端浏览器访问pc网站
 * 
 * Bootstrap 中定义的桌面显示器 > 992px
 * 判断页面是移动端还是PC端
 * 移动默认是小于768(暂不考虑横屏)
 */
const Min_Width = 768;
// 监听页面宽度变化
const onResize = ({ width }: { width: number }) => {
  // 宽度为 0 时, 页面隐藏
  if (width > 0) {
    let device = width > Min_Width ? DeviceEnum.PC : DeviceEnum.MOBILE;
    console.log("🚀 ~ onResize ~ device:", device);
  }
};
</script>

