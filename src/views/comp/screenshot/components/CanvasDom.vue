<!--
 * @Author: Komorebi
 * @Date: 2025-07-19 11:58:25
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-19 16:20:13
-->
<template>
  <div class="wrapper" ref="domRef">
    <canvas
      ref="canvasRef"
      class="signature-canvas"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
    />
    <!-- @touchstart="startTouchDrawing"
      @touchmove="touchDraw"
      @touchend="stopDrawing"
      @touchcancel="stopDrawing" -->
  </div>
</template>

<script setup lang="ts">
interface Point {
  x: number;
  y: number;
}

const props = defineProps({
  height: {
    type: [Number, String] as PropType<string | number>,
    // required: false,
    default: 200,
  },
});

// 计算画布高度
const canvasHeight = computed(() => {
  const height = props.height;
  if (typeof height === "number") {
    return `${height}px`;
  }
  return height;
});

const domRef = ref();
defineExpose({ domRef });

const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasCtx = ref<CanvasRenderingContext2D | null>(null);
// 判断是否有签名
const isDraw = ref(false);
// 画笔终点坐标
const lastPoint = ref<Point>({ x: 0, y: 0 });

/** 
 * onMounted的回调函数延迟执行的特性，
 * 使得它可以访问在代码顺序上 "后面声明" 的const函数
 */
onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  canvasCtx.value = canvas.getContext("2d");
  // 初始化画布样式
  initCanvasStyles();
});

const startDrawing = (e: MouseEvent) => {
  console.log(e);
};
const draw = (e: MouseEvent) => {
  console.log(e);
};
const stopDrawing = (e: MouseEvent) => {
  console.log(e);
};

const initCanvasStyles = () => {
  if(!canvasCtx.value) return;
  // 线条端点的样式
  canvasCtx.value.lineCap = "round";
  // 线条连接点的样式
  canvasCtx.value.lineJoin = "round";
  // 线条宽度
  canvasCtx.value.lineWidth = 2;
  // 线条颜色
  canvasCtx.value.strokeStyle = "#000";
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  .signature-canvas {
    width: 100%;
    height: v-bind(canvasHeight);
    // TODO: 画布适应主题, 画笔也是
    background-color: #f5f7fb;
  }
}
</style>
