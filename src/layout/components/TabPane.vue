<!--
 * @Author: Komorebi
 * @Date: 2024-11-15 14:24:10
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-02 14:24:20
-->
<template>
  <div class="wrapper">
    <el-tabs
      type="card"
      v-model="tabsValue"
      @tab-remove="closeRoute"
      @tab-change="changeRoute"
    >
      <el-tab-pane
        v-for="item in tabsList"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isAffix"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router";
import type { TabPaneName } from "element-plus";

import store from "@/store";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "@/hooks/useI18n";

interface Tab {
  title?: string;
  name?: string;
  isAffix?: boolean;
}

/**
 * 初始化 tabs 中的路由列表
 */
const router = useRouter();
const routeList = router.getRoutes();
const affixRouteList = routeList.filter((item) => item.meta.isAffix);
affixRouteList.forEach((item) => {
  const { meta, name, path } = item;
  const route = { meta, name, path, fullPath: path, query: {}, params: {} };
  store.appSet.addTab(route as RouteLocationNormalized);
});

const tabsValue = ref("");
const tabsList = ref<Tab[]>([]);

/**
 * 将当前路由添加到路由缓存中
 */
watch(
  /**
   * *如果外层被 ref 或 reactive 包裹可直接侦听
   * *如果侦听的是 ref 或 reactive 下的具体的某个值必须使用函数返回值的形式侦听
   */
  () => router.currentRoute.value,
  (newVal) => {
    tabsValue.value = newVal.name as string;
    store.appSet.addTab(newVal);
  },
  { immediate: true }
);
// 根据路由列表变化 tabsList
watch(
  store.appSet.tabList,
  (newVal) => {
    // console.log("🚀 ~ watch ~ newVal:", newVal);
    tabsList.value = newVal.map((item) => ({
      title: useI18n(item.meta.title, "Route"),
      name: item.name as string,
      isAffix: !item.meta.isAffix,
    }));
  },
  { immediate: true }
);

const closeRoute = (e: TabPaneName) => {
  let tab = store.appSet.tabList.find((item) => item.name === e);
  store.appSet.closeTab(tab as RouteLocationNormalized, router);
};

const route = useRoute();
const changeRoute = (e: TabPaneName) => {
  // console.log("🚀 ~ changeRoute ~ e:", e);
  /**
   * 判断当前路由是否是点击的tab栏
   */
  const { name: currRouteName } = route;
  // console.log("🚀 ~ changeRoute ~ currRouteName:", currRouteName);
  if (e !== currRouteName) {
    let tab = store.appSet.tabList.find((item) => item.name === e);
    const { name, params, query } = tab as RouteLocationNormalized;
    router.push({ name, params, query });
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  :deep(.el-tabs__header) {
    margin: 0;
    height: auto;
    border: none;
    .el-tabs__nav {
      border: none;
      .el-tabs__item {
        padding: 0 13px;
        --el-tabs-header-height: 28px;
        &:last-child {
          padding-right: 13px;
          border-right: 1px solid var(--el-border-color-light);
        }
        &.is-active {
          border-bottom: none;
          // @include background_color("nav-active-font-color");
          // @include font_color("content-font-color");
        }
      }
    }
  }
}

/* 仅移动端生效 */
@media (max-width: 768px) {
  .wrapper {
    :deep(.el-tabs__header) {
      .el-tabs__nav {
        &-next,
        &-prev {
          line-height: 30px;
        }
      }
    }
  }
}
</style>
