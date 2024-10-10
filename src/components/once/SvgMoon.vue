<!--
 * @Author: Komorebi
 * @Date: 2024-10-10 14:07:13
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-10 14:19:18
-->
<template>
  <SvgIcon icon-class="common-theme_moon" class-name="moon"></SvgIcon>
</template>

<script setup lang="ts">
/**
 * Vue3.3+
 */
defineOptions({
  name: "Moon",
});
</script>

<style scoped lang="scss">
.moon {
  /**
  * *  必须先设定当前主题, 才能使用
  */
  // @include font_color("content-font-color");
  color: #fafafa;
}
</style>
