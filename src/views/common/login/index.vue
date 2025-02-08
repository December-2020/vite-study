<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:28:06
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-07 11:58:46
-->
<template>
  <div class="wrapper overflow-hidden">
    <canvas ref="canvasRef"></canvas>
    <!-- <BaseButton @click="changeCanvas">测试</BaseButton> -->
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
// const changeCanvas = () => {
// //   setOptions({ width: 500, height: 500 });
// };
</script>

<style scoped lang="scss">
.wrapper {
  // width: 100vw;
  // height: 100vh;
  canvas {
    // border: solid 1px red;
    // width: calc(100% - 2px);
    // height: calc(100% - 2px);
  }
}
</style>
