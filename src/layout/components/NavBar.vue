<!--
 * @Author: Komorebi
 * @Date: 2024-10-11 14:43:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-28 16:34:24
-->
<template>
  <el-scrollbar wrap-class="nav-scroll">
    <el-menu
      v-bind="menuProps"
      :default-active="activeMenu"
      class="h-100% w-52.5 nav-scroll-menu"
      :collapse="isCollapse"
    >
      <NavBarItem
        v-for="item in menuList"
        :key="item.path"
        :route="item"
        :base-path="item.path"
        @menuClick="emit('menu-click')"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import type { AppRouteRecordRaw } from "#/route";

import NavBarItem from "./NavBarItem.vue";
import store from "@/store";
import { useRouter, useRoute } from "vue-router";

interface MenuProps {
  mode?: "horizontal" | "vertical";
  // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
  collapse?: boolean;
  // 是否省略多余的子项（仅在横向模式生效）
  ellipsis?: boolean;
  ellipsisIcon?: string | Component;
  popperOffset?: number;
  uniqueOpened?: boolean;
  router?: boolean;
  popperClass?: string;
}

const Router = useRouter();
/**
 * 获取一级路由
 */
// // 不包含动态添加的路由
// const routes = Router.options.routes as unknown as AppRouteRecordRaw[];
// // 侧边栏菜单列表
// const menuList = computed(() => {
//   return routes.filter((item) => !item.meta?.hidden);
// });
// 包含动态添加的路由
const routeList = Router.getRoutes() as unknown as AppRouteRecordRaw[];
const menuList = routeList.filter(
  (route) => route.path.split("/").length === 2 && !route.meta?.hidden
);

// 菜单栏是否展开与收起
const isCollapse = computed(() => store.appSet.isPC && store.appSet.isCollapse);

/**
 * 活动的菜单
 * bug修复: 面包屑导航时, 菜单无响应
 * ! 不能解构, 解构会丢失响应性
 */
const route = useRoute();
const activeMenu = computed(() => {
  return route.path;
});

const menuProps = withDefaults(defineProps<MenuProps>(), {
  mode: "vertical",
  uniqueOpened: true,
  router: true,
  popperClass: "menu-popper",
});
// const menuWidth = menuProps.mode === "vertical" ? "210px" : "auto";

// 菜单点击事件
// 不是 pc 端, 点击菜单后收起菜单
const emit = defineEmits(["menu-click"]);
</script>

<style scoped lang="scss">
/**
  * 深度选择器(官方) 
  * 样式穿透
  */
:deep(.el-scrollbar__view) {
  height: 100%;
}

/* 仅移动端生效 */
@media (max-width: 768px) {
  .nav-scroll-menu {
    width: auto;
    border-right: none;
  }
}
</style>
