<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:28:06
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-22 14:58:06
-->
<template>
  <div class="wrapper">
    <canvas ref="canvasRef"></canvas>
    <BaseButton @click="changeCanvas">测试</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { useLineAnimate } from "@/hooks/useLineAnimate";

defineOptions({ name: "Login" });

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { setOptions } = useLineAnimate(canvasRef);

onMounted(() => {
  setOptions({ width: 300, height: 300 });
});
const changeCanvas = () => {
//   setOptions({ width: 500, height: 500 });
};
</script>

<style scoped lang="scss"></style>
