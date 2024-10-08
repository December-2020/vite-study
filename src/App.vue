<template>
  <el-config-provider :locale="locale">
    <!-- <el-date-picker type="date" placeholder="Pick a day" /> -->
    <!-- <el-button @click="toggleLocale">语言切换</el-button> -->
    <!-- <base-input
      v-model="iptVal"
      width="298"
      clearable
      @clear="handleClear"
      ref="testRef"
    >
      <template #prepend>Http://</template>
      <template #append>.com</template>
    </base-input> -->
    <!-- <base-input
      v-model="iptVal"
      clearable
      ref="testRef1"
    ></base-input> -->
    <!-- <el-button @click="handleTestRef">清空输入框</el-button> -->
    <!-- <div>
      <h3>测试路由导航</h3>
      <el-button @click="toggleRoute('Login')">login</el-button>
      <el-button @click="toggleRoute('404')">404</el-button>
      <el-button @click="toggleRoute('Line')">Line</el-button>
    </div> -->
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

// import { useRouter } from "vue-router";

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


// const toggleLocale = () => {
//   const { lang } = storeToRefs(store.appSet);
//   let _lang =
//     lang.value === LanguageEnum.CHINESE
//       ? LanguageEnum.ENGLISH
//       : LanguageEnum.CHINESE;
//   store.appSet.setLang(_lang);
// };

// const iptVal = ref("");
// watchEffect(() => console.log(iptVal.value));
// const handleClear = () => {
//   console.log(1111);
// };
// const testRef = ref();
// const testRef1 = ref();
// const handleTestRef = () => {
//   testRef.value?.clear();
//   testRef1.value?.focus();
// };

// const router = useRouter();
// const toggleRoute = (route: string) => {
//   // console.log("🚀 ~ toggleRoute ~ route:", route);
//   router.push({ name: route });
// };
</script>

<style lang="scss" scoped>
// .wrap {
/**
 * *  必须先设定当前主题, 才能使用
 */
//   @include background_color("nav-bg-color");
//   height: 100px;
// }
</style>
