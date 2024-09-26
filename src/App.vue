<template>
  <el-config-provider :locale="locale">
    <el-button @click="toggleDark()">主题切换</el-button>
    <el-date-picker type="date" placeholder="Pick a day" />
    <el-button @click="toggleLocale">语言切换</el-button>
  </el-config-provider>
</template>

<script setup lang="ts">
// 引入 element-plus 中的语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { useDark, useToggle } from "@vueuse/core";
// pinia中使用解构
import { storeToRefs } from "pinia";
import store from "@/store";
import { LanguageEnum } from "@/enums/app";

// 对 element UI 中的组件使用国际化
const elFile = {
  [LanguageEnum.CHINESE]: zhCn,
  [LanguageEnum.ENGLISH]: en,
};
const locale = computed(() => {
  const { lang } = storeToRefs(store.appSet);
  return elFile[lang.value];
});

// 测试代码
const isDark = useDark({
  selector: "html",
  valueDark: "dark",
  valueLight: "light",
});
// console.log("🚀 ~ changeTest ~ isDark:", isDark);
const toggleDark = useToggle(isDark);
// console.log("🚀 ~ changeTest ~ toggleDark:", toggleDark)
// const changeTest = () => {
// };

const toggleLocale = () => {
  const { lang } = storeToRefs(store.appSet);
  let _lang =
    lang.value === LanguageEnum.CHINESE
      ? LanguageEnum.ENGLISH
      : LanguageEnum.CHINESE;
  store.appSet.setLang(_lang);
};
</script>

<style lang="scss" scoped>
.wrap {
  @include background_color("nav-bg-color");
  height: 100px;
}
</style>
