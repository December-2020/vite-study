<!--
 * @Author: Komorebi
 * @Date: 2025-07-04 11:16:32
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-07 17:13:38
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
        <div class="preview_img h-80px flex" ref="previewImg"></div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from "vue";
import BasicDom from "../components/BasicDom.vue";
import ButtonWrap from "../components/ButtonWrap.vue";
import { snapdom } from "@zumer/snapdom";

defineOptions({ name: "snapDom" });

const basicDom = ref<ComponentPublicInstance<typeof BasicDom> | null>(null);
const previewImg = ref<HTMLElement | null>(null);
const handleCapture1 = async () => {
  // console.log("🚀 ~ handleCapture1 ~ basicDom:", basicDom.value);
  // console.log("🚀 ~ handleCapture1 ~ basicDom:", basicDom.value.domRef);
  const res = await snapdom(basicDom.value.domRef, {
    scale: 0.8,
  });
  // console.log("🚀 ~ handleCapture1 ~ res:", res);
  const img = await res.toImg();
  previewImg.value?.appendChild(img);
};
const handleDownload1 = () => {
  console.log("🚀 ~ handleDownload1 ~ 下载:");
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
