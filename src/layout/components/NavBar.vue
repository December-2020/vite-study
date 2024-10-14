<!--
 * @Author: Komorebi
 * @Date: 2024-10-11 14:43:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-14 16:57:48
-->
<template>
  <el-scrollbar wrap-class="nav-scroll">
    <el-menu
      v-bind="menuProps"
      :default-active="activeMenu"
      class="nav-scroll-menu h-100% w-210px"
      :collapse="store.appSet.isCollapse"
    >
      <NavBarItem
        v-for="item in menuList"
        :key="item.path"
        :route="item"
        :base-path="item.path"
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
const routes = Router.options.routes as unknown as AppRouteRecordRaw[];
// 侧边栏菜单列表
const menuList = computed(() => {
  return routes.filter((item) => !item.meta?.hidden);
});

// 活动的菜单
const { path } = useRoute();
const activeMenu = computed(() => {
  return path;
});

const menuProps = withDefaults(defineProps<MenuProps>(), {
  mode: "vertical",
  uniqueOpened: true,
  router: true,
  popperClass: "menu-popper",
});
// const menuWidth = menuProps.mode === "vertical" ? "210px" : "auto";
</script>

<style scoped lang="scss">
/**
  * 深度选择器(官方) 
  * 样式穿透
  */
:deep(.el-scrollbar__view) {
  height: 100%;
}
.nav-scroll {
  &-menu {
    /**
    * *element plus 修改颜色变量 
    */
    // --el-menu-bg-color: #eee;
    // --el-menu-text-color: #303133;
    // --el-menu-active-color: #fafafa;
    /** 
    * ! 未生效
    * 为什么没生效?
    * "--el-menu-bg-color" 没有解析 "getVar('nav-bg-color')"
    * 而是把这整体当做一个颜色值
    *
    * 暂未实现, 先挂起
    */
    // @include nav_bg_color();
    // @include nav_font_color();
    // @include nav_active_font_color();
  }
}
</style>
