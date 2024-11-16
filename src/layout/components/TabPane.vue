<!--
 * @Author: Komorebi
 * @Date: 2024-11-15 14:24:10
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-16 11:30:50
-->
<template>
  <div class="wrapper">
    <el-tabs type="card" v-model="tabsValue">
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
import store from "@/store";
import { useRouter, useRoute } from "vue-router";

/**
 * 初始化 tabs 中的路由列表
 */
const router = useRouter();
const routeList = router.getRoutes();
const affixRouteList = routeList.filter((item) => item.meta.isAffix);
// affixRouteList.forEach(item=>{
//   store.appSet.addTab(item)
// })
console.log("🚀 ~ affixRouteList:", affixRouteList);
/** 
 * 将当前路由添加到路由缓存中
 */
const route = useRoute();
const currRoute = toRaw(route);
store.appSet.addTab(currRoute)

const tabsValue = ref("1");
const tabsList = ref([
  { title: "Tab 1", name: "1", isAffix: false },
  { title: "Tab 2", name: "2", isAffix: false },
  { title: "Tab 3", name: "3", isAffix: true },
  { title: "Tab 4", name: "4", isAffix: true },
]);

const getTabList = computed(() => store.appSet.getCacheTabList);
console.log("🚀 ~ getTabList:", getTabList.value);
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
</style>
