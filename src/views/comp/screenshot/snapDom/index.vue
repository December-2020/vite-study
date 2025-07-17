<!--
 * @Author: Komorebi
 * @Date: 2025-07-04 11:16:32
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-17 17:07:27
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
import BasicDom from "../components/BasicDom.vue";
import ButtonWrap from "../components/ButtonWrap.vue";
import { snapdom } from "@zumer/snapdom";
import { ElMessage } from "element-plus";

defineOptions({ name: "snapDom" });

const dateStr = new Date().toISOString().replace(/[-:T.]/g, "");
console.log("🚀 ~ dateStr:", dateStr)

const basicDom = ref<ComponentPublicInstance<typeof BasicDom> | null>(null);
const basicDomUrl = ref<string>("");
const handleCapture1 = async () => {
  // console.log("🚀 ~ handleCapture1 ~ basicDom:", basicDom.value);
  // console.log("🚀 ~ handleCapture1 ~ basicDom:", basicDom.value.domRef);
  const res = await snapdom(basicDom.value?.domRef);
  // console.log("🚀 ~ handleCapture1 ~ res:", res)
  basicDomUrl.value = res.url;
};
const handleDownload1 = async () => {
  if (!basicDomUrl.value) {
    ElMessage.error("请先截图");
    return;
  }
  try {
    // 检查浏览器兼容性
    if (!("download" in HTMLAnchorElement.prototype)) {
      // Browser not supported
      let errMsg = "您的浏览器不支持下载功能";
      // ElMessage.error(errMsg);
      throw new Error(errMsg);
    }
    // 将图片转换为blob
    const response = await fetch(basicDomUrl.value);
    console.log("🚀 ~ handleDownload1 ~ response:", response);
    if (!response.ok) {
      throw new Error(
        `获取图片失败: ${response.status} ${response.statusText}`
      );
    }

    // 创建下载链接
    const blob = await response.blob();
    const fileName = "screenshot."; // 文件名
  } catch (err) {}
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
