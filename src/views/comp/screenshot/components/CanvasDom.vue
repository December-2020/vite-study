<!--
 * @Author: Komorebi
 * @Date: 2025-07-19 11:58:25
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-24 13:45:22
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
    ></canvas>
    <!-- @touchstart="startTouchDrawing"
      @touchmove="touchDraw"
      @touchend="stopDrawing"
      @touchcancel="stopDrawing" -->
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { getCssVariable } from "@/utils/css";
import { useEventListener } from "@/hooks/useEventListener";

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

const canvasRef = ref<HTMLCanvasElement | null>(null);
const canvasCtx = ref<CanvasRenderingContext2D | null>(null);
// 判断是否有签名
const isDraw = ref(false);
// 判断是否正在绘制
const isDrawing = ref(false);
// 画笔终点坐标
const lastPoint = ref<Point>({ x: 0, y: 0 });
// 移除窗口大小变化监听
let removeResizeListener: Fn = () => {};

/**
 * onMounted的回调函数延迟执行的特性，
 * 使得它可以访问在代码顺序上 "后面声明" 的const函数
 */
onMounted(() => {
  initCanvas();
});
onUnmounted(() => {
  themeWatch();
  removeResizeListener();
});

// 开始绘制
const startDrawing = (e: MouseEvent) => {
  // console.log(e);
  if (!canvasRef.value || !canvasCtx.value) return;
  isDraw.value = true;
  isDrawing.value = true;

  // 获取鼠标点击位置的坐标
  const { clientX, clientY } = e;
  // 获取画布的左上角坐标
  const { left, top } = canvasRef.value.getBoundingClientRect();
  // 计算鼠标点击位置相对于画布的坐标
  const x = clientX - left;
  const y = clientY - top;
  // 保存鼠标点击位置的坐标
  lastPoint.value = { x, y };
};
const draw = (e: MouseEvent) => {
  // console.log(e);
  if (!isDrawing.value || !canvasRef.value || !canvasCtx.value) return;

  // 获取鼠标点击位置的坐标
  const { clientX, clientY } = e;
  // 获取画布的左上角坐标
  const { left, top } = canvasRef.value.getBoundingClientRect();
  // 计算鼠标点击位置相对于画布的坐标
  const currentPoint = { x: clientX - left, y: clientY - top };
  // 绘制线条
  drawLine(lastPoint.value, currentPoint);
  // 保存鼠标点击位置的坐标
  lastPoint.value = currentPoint;
};
const stopDrawing = (e: MouseEvent) => {
  // console.log(e);
  isDrawing.value = false;
};

// 初始化画布
const initCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  canvasCtx.value = canvas.getContext("2d");
  // 初始化画布尺寸
  resizeCanvas();
  // 初始化画布样式
  initCanvasStyles();
  // 监听窗口大小变化，重新设置画布尺寸
  const { removeEvent } = useEventListener({
    el: window,
    name: "resize",
    listener: resizeCanvas,
  });
  removeResizeListener = removeEvent;
};
// 初始化画布样式
const initCanvasStyles = () => {
  if (!canvasCtx.value) return;
  // 线条端点的样式
  canvasCtx.value.lineCap = "round";
  // 线条连接点的样式
  canvasCtx.value.lineJoin = "round";
  // 线条宽度
  canvasCtx.value.lineWidth = 2;
};
// 设置画布背景色与线条颜色(适配主题)
const setCanvasColor = () => {
  if (!canvasCtx.value || !canvasRef.value) return;
  const color = getCssVariable("--content-bg-color");
  const bgColor = getCssVariable("--content-font-color");
  // 线条颜色
  canvasCtx.value.strokeStyle = color;
  // 背景色
  canvasCtx.value.fillStyle = bgColor;
  canvasCtx.value.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);
};
// 初始化画布尺寸(调整缩放比例)
const resizeCanvas = () => {
  const canvas = canvasRef.value;
  // console.log("🚀 ~ resizeCanvas ~ canvas:", canvas);
  if (!canvas) return;
  // 获取画布父元素的尺寸
  const { clientWidth, clientHeight } = canvas.parentElement as HTMLElement;
  // 获取设备像素比
  const dpr = window.devicePixelRatio || 1;
  canvas.width = clientWidth * dpr;
  canvas.height = clientHeight * dpr;
  // 缩放上下文以匹配设备像素比
  if (canvasCtx.value) {
    canvasCtx.value.scale(dpr, dpr);
  }
  setCanvasColor();
};
// 在两点间绘制线条
const drawLine = (startPoint: Point, endPoint: Point) => {
  if (!canvasCtx.value) return;
  // 开始绘制
  canvasCtx.value.beginPath();
  // 移动到起始点
  canvasCtx.value.moveTo(startPoint.x, startPoint.y);
  // 绘制到终点
  canvasCtx.value.lineTo(endPoint.x, endPoint.y);
  // 结束绘制
  canvasCtx.value.stroke();
};
// 清空画布
const clearCanvas = () => {
  if (!canvasCtx.value || !canvasRef.value) return;
  // 清空画布(实际为覆盖画布)
  setCanvasColor();
  // 清空画布
  /* canvasCtx.value.clearRect(
    0,
    0,
    canvasRef.value.width,
    canvasRef.value.height
  ); */
};

// 监听主题变化
const themeWatch = watch(
  () => store.appSet.isDarkTheme,
  () => {
    setCanvasColor();
  }
);

// 暴露方法
const domRef = ref();
defineExpose({ domRef, clearCanvas });
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  .signature-canvas {
    width: 100%;
    height: v-bind(canvasHeight);
  }
}
</style>
