<!--
 * @Author: Komorebi
 * @Date: 2025-07-03 13:48:24
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-03 17:10:03
-->
<template>
  <div class="wrapper" ref="mapRef"></div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";

defineOptions({ name: "AMap" });

// 获取父元素高度
const parentHeight = ref("");
const resizeObserve = new ResizeObserver((entries) => {
  if (entries.length) {
    const { height = 0 } = entries[0].contentRect;
    parentHeight.value = `${height}px`;
  }
});

const mapRef = ref<HTMLElement | null>(null);
// @ts-ignore
let map = null;

onMounted(async () => {
  // 获取dom节点
  const container = document.querySelector(
    "#app-main .el-scrollbar__wrap"
  ) as HTMLElement;
  // 监听dom节点变化
  resizeObserve.observe(container);

  nextTick(() => {
    const wrapEl = unref(mapRef);
    if (!wrapEl) return;

    (window as any)._AMapSecurityConfig = {
      // 「你申请的安全密钥」
      securityJsCode: "6e9166a893b6e99d614ac3483930ef6e",
    };
    AMapLoader.load({
      // 申请好的Web端开发者Key，首次调用 load 时必填
      key: "e715801af2b43bc636a1cca14ff9759a",
      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      version: "2.0",
      //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
      //   plugins: ["AMap.Scale"],
    })
      .then((AMap) => {
        // 设置地图容器id
        map = new AMap.Map(wrapEl, {
          // 是否为3D地图模式
          viewMode: "3D",
          // 初始化地图级别
          zoom: 11,
          // 初始化地图中心点位置
          center: [116.397428, 39.90923],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  });
});
onUnmounted(() => {
  resizeObserve.disconnect();
  // @ts-ignore
  map?.destroy();
});

</script>

<style scoped lang="scss">
.wrapper {
  height: v-bind("parentHeight");
}
</style>
