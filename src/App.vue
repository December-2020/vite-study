<!--
 * @Author: Komorebi
 * @Date: 2024-09-23 15:08:24
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-12-25 14:03:34
-->
<template>
  <el-config-provider :locale="locale">
    <router-view v-element-size="onResize" class="h-100vh" />
  </el-config-provider>
</template>

<script setup lang="ts">
import store from "@/store";
// 引入 element-plus 中的语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { vElementSize } from "@vueuse/components";
// pinia中使用解构
import { storeToRefs } from "pinia";
import { LanguageEnum, DeviceEnum } from "@/enums/app";

// 对 element UI 中的组件使用国际化
const elFile = {
  [LanguageEnum.CHINESE]: zhCn,
  [LanguageEnum.ENGLISH]: en,
};
const locale = computed(() => {
  /** 
   * 将为任何响应式属性创建 refs。 
   * 当您仅使用 store 中的状态但不调用任何操作时，这很有用
   */
  const { lang } = storeToRefs(store.appSet);
  return elFile[lang.value];
});
/**
 * Bootstrap 中定义的桌面显示器 > 992px
 * 判断页面是移动端还是PC端
 * 移动默认是小于768(暂不考虑横屏)
 */
const Min_Width = 768;
// 监听页面宽度变化
const onResize = ({ width }: { width: number }) => {
  // 宽度为 0 时, 页面隐藏
  if (width > 0) {
    // 判断移动端还是pc端
    let device = DeviceEnum.PC;
    /**
     * navigator.userAgent
     * 检测是否包含 iPhone iPad iPod Android iOS 这些关键字
     * 如果包含则是移动端
     * 该方法并不100%准确
     * 因为用户可以pc浏览器模拟手机ua
     * 也能使用移动端浏览器访问pc网站
     */
    if (
      width < Min_Width ||
      /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
    ) {
      device = DeviceEnum.MOBILE;
    }
    store.appSet.setDevice(device);
    // console.log("🚀 ~ onResize ~ device:", device);
  }
};
</script>
