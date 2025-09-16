<!--
 * @Author: Komorebi
 * @Date: 2025-09-15 11:58:25
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-15 14:16:55
-->
<template>
  <div class="wrapper">
    <iframe :src="frameSrc" frameborder="0" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FrameExample" });
const frameSrc = ref("https://element-plus.org/zh-CN/guide/design.html");

// 获取父元素高度
const parentHeight = ref("");
const resizeObserve = new ResizeObserver((entries) => {
  if (entries.length) {
    const { height = 0 } = entries[0].contentRect;
    parentHeight.value = `${height}px`;
  }
});

onMounted(() => {
  // 获取dom节点
  const container = document.querySelector(
    "#app-main .el-scrollbar__wrap"
  ) as HTMLElement;
  // 监听dom节点变化
  resizeObserve.observe(container);
});
onUnmounted(() => {
  resizeObserve.disconnect();
});
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  // height: 100%;
  height: v-bind("parentHeight");
  iframe {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}
</style>
