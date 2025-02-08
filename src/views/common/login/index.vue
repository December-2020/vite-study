<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:28:06
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-08 10:55:26
-->
<template>
  <div class="wrapper overflow-hidden">
    <canvas ref="canvasRef"></canvas>
    <div class="login-wrapper w-500px h-300px absolute">
      <div class="header-wrap flex flex-justify-end p-16px">
        <theme-switch class="m-r-10px" />
        <lang-dropdown />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLineAnimate } from "@/hooks/useLineAnimate";

defineOptions({ name: "Login" });

const canvasRef = ref<HTMLCanvasElement | null>(null);
useLineAnimate(canvasRef);

onMounted(() => {
  // setOptions({ width: 300, height: 300 });
});
</script>

<style scoped lang="scss">
.wrapper {
  .login-wrapper {
    left: calc(50% - 250px);
    top: calc(50% - 150px);
    border: solid 1px #ddd;
    @include background_color("content-bg-color");
    @include font_color("content-font-color");
    // background-color: #fafafa;
  }
}
</style>
