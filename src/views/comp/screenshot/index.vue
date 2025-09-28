<!--
 * @Author: Komorebi
 * @Date: 2025-07-04 11:16:32
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-28 16:17:41
-->
<template>
  <div class="wrapper">
    <h3 class="mt-0">使用snapDOM进行截图</h3>

    <!-- 基础案例 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t("Comp.screenshot.basicExample") }}</span>
        </div>
      </template>
      <BasicDom ref="basicDom" class="hover-transform-scale-101" />
      <ButtonWrap
        @capture="handleCapture1"
        @download="handleDownload1"
        class="mt-4"
      />
      <template #footer>
        <div class="preview_img h-80px flex">
          <img :src="basicDomUrl" class="transform-scale-90" />
        </div>
      </template>
    </el-card>

    <!-- 动画案例 -->
    <el-card class="m-t-10px">
      <template #header>
        <div class="card-header">
          <span>{{ $t("Comp.screenshot.dynamicExample") }}</span>
        </div>
      </template>
      <AnimateDom ref="animateDom" />
      <ButtonWrap
        @capture="handleCapture2"
        @download="handleDownload2"
        class="mt-4"
      />
      <template #footer>
        <div class="preview_img flex h-140px">
          <img :src="animateDomUrl" class="transform-scale-80" />
        </div>
      </template>
    </el-card>

    <!-- 画布案例 -->
    <el-card class="m-t-10px">
      <template #header>
        <div class="card-header">
          <span>{{ $t("Comp.screenshot.canvas") }}</span>
        </div>
      </template>
      <CanvasDom ref="canvasDom" />
      <ButtonWrap
        @capture="handleCapture3"
        @download="handleDownload3"
        class="mt-4"
      >
        <BaseButton @click="clearCanvas" plain>清空</BaseButton>
      </ButtonWrap>
      <template #footer>
        <div class="preview_img flex h-160px">
          <img :src="canvasDomUrl" class="transform-scale-80" />
        </div>
      </template>
    </el-card>

    <!-- 裁剪案例 -->
    <el-card class="m-t-10px">
      <template #header>
        <div class="card-header">
          <span>clip</span>
        </div>
      </template>
      <ClipDom ref="clipDom" />
      <ButtonWrap
        @capture="handleCapture4"
        @download="handleDownload4"
        class="mt-4"
      />
      <template #footer>
        <div class="preview_img flex h-160px">
          <img :src="clipDomUrl" class="transform-scale-80" />
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from "vue";
import BasicDom from "./components/BasicDom.vue";
import ButtonWrap from "./components/ButtonWrap.vue";
import AnimateDom from "./components/AnimateDom.vue";
import CanvasDom from "./components/CanvasDom.vue";
import ClipDom from "./components/ClipDom.vue";
import { snapdom } from "@zumer/snapdom";
import { ElMessage } from "element-plus";
import { formatDateTime } from "@/utils/date";

defineOptions({ name: "snapDom" });

// 基础案例
const basicDom = ref<ComponentPublicInstance<typeof BasicDom> | null>(null);
const basicDomUrl = ref<string>("");
const handleCapture1 = async () => {
  const res = await snapdom(basicDom.value?.domRef);
  basicDomUrl.value = res.url;
};
const handleDownload1 = () => {
  downloadImg(basicDomUrl.value);
};

// 动画案例
const animateDom = ref<ComponentPublicInstance<typeof AnimateDom> | null>(null);
const animateDomUrl = ref<string>("");
const handleCapture2 = async () => {
  const res = await snapdom(animateDom.value?.domRef);
  animateDomUrl.value = res.url;
};
const handleDownload2 = () => {
  downloadImg(animateDomUrl.value);
};

// 画布案例
const canvasDom = ref<ComponentPublicInstance<typeof CanvasDom> | null>(null);
const canvasDomUrl = ref<string>("");
const handleCapture3 = async () => {
  // 获取设备像素比 (同canvas)
  const dpr = window.devicePixelRatio || 1;
  // console.log("🚀 ~ handleCapture3 ~ dpr:", dpr);
  const res = await snapdom(canvasDom.value?.domRef, { dpr });
  canvasDomUrl.value = res.url;
};
const handleDownload3 = () => {
  downloadImg(canvasDomUrl.value);
};
const clearCanvas = () => {
  canvasDom.value?.clearCanvas();
};

// 裁剪案例
const clipDom = ref<ComponentPublicInstance<typeof ClipDom> | null>(null);
const clipDomUrl = ref<string>("");
const handleCapture4 = async () => {
  const res = await snapdom(clipDom.value?.domRef);
  clipDomUrl.value = res.url;
};
const handleDownload4 = () => {
  downloadImg(clipDomUrl.value);
};

// 下载图片
function downloadImg(imgUrl: string) {
  if (!imgUrl) {
    ElMessage.error("请先截图");
    return;
  }
  /**
   * * svg 需要通过 canvas 转换为 png 或者 jpg 格式
   * 1. 创建 canvas 元素
   * 2. 创建图片对象
   * 3. 图片对象加载完成后，将图片绘制到 canvas 上
   */
  // 生成文件名：年月日_时分
  let date = formatDateTime(new Date())
    .replace(/[\s]/g, "_")
    .replace(/[-:]/g, "");
  const fileName = `screenshot${date}.png`;

  // 创建图片对象
  const image = new window.Image();
  image.crossOrigin = "anonymous";
  image.src = imgUrl;
  image.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(image, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) {
        ElMessage.error("图片转换失败");
        return;
      }
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      ElMessage.success("图片下载成功");
    }, "image/png");
  };
  image.onerror = function () {
    ElMessage.error("图片加载失败");
  };
}
</script>

<style scoped lang="scss">
.wrapper {
  .preview_img {
    align-items: center;
    justify-content: center;
  }
}
</style>
