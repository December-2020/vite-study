<template>
  <div class="wrap">
    <el-button @click="toggleDark()">主题切换</el-button>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";


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
</script>

<style lang="scss" scoped>

.wrap {
  @include background_color('nav-bg-color');
  height: 100px;
}
</style>
