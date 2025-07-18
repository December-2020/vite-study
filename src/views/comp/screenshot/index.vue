<!--
 * @Author: Komorebi
 * @Date: 2025-07-04 11:16:32
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-18 11:20:02
-->
<template>
  <div class="wrapper">
    <h3 class="mt-0">使用snapDOM进行截图</h3>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ $t("Comp.screenshot.baseCase") }}</span>
        </div>
      </template>
      <BasicDom ref="basicDom" />
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
  </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from "vue";
import BasicDom from "./components/BasicDom.vue";
import ButtonWrap from "./components/ButtonWrap.vue";
import { snapdom } from "@zumer/snapdom";
import { ElMessage } from "element-plus";
import { formatDateTime } from "@/utils/date";

defineOptions({ name: "snapDom" });

const basicDom = ref<ComponentPublicInstance<typeof BasicDom> | null>(null);
const basicDomUrl = ref<string>("");
const handleCapture1 = async () => {
  // console.log("🚀 ~ handleCapture1 ~ basicDom:", basicDom.value);
  // console.log("🚀 ~ handleCapture1 ~ basicDom:", basicDom.value.domRef);
  const res = await snapdom(basicDom.value?.domRef);
  // console.log("🚀 ~ handleCapture1 ~ res:", res.url)
  basicDomUrl.value = res.url;
};
const handleDownload1 = () => {
  if (!basicDomUrl.value) {
    ElMessage.error("请先截图");
    return;
  }
  // 生成文件名：年月日_时分
  let date = formatDateTime(new Date())
    .replace(/[\s]/g, "_")
    .replace(/[-:]/g, "");
  const fileName = `screenshot${date}.png`;

  /** 
   * * svg 需要通过 canvas 转换为 png 或者 jpg 格式
   * 1. 创建 canvas 元素
   * 2. 创建图片对象
   * 3. 图片对象加载完成后，将图片绘制到 canvas 上
   */
  // 创建图片对象
  const image = new window.Image();
  image.crossOrigin = "anonymous";
  image.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(image, 0, 0);
    canvas.toBlob(function (blob) {
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
  image.src = basicDomUrl.value;
};
</script>

<style scoped lang="scss">
.wrapper {
  .preview_img {
    align-items: center;
    justify-content: center;
  }
}
</style>
