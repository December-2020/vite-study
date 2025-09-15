<!--
 * @Author: Komorebi
 * @Date: 2025-09-15 11:58:25
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-15 14:16:55
-->
<template>
  <div class="wrapper">
    <iframe :src="frameSrc" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FrameExample" });
const frameSrc = ref("https://element-plus.org/zh-CN/guide/design.html");
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  iframe {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}
</style>
