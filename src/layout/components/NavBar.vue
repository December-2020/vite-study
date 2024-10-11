<!--
 * @Author: Komorebi
 * @Date: 2024-10-11 14:43:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-11 16:41:00
-->
<template>
  <el-scrollbar wrap-class="nav-scroll">
    <el-menu v-bind="menuProps" class="nav-scroll-menu">
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
  defaultActive?: string;
  popperClass?: string;
}

const Router = useRouter();
const routes = Router.options.routes as unknown as AppRouteRecordRaw[];
// 侧边栏菜单列表
const menuList = computed(() => {
  return routes.filter((item) => !item.meta?.hidden);
});
// 活动的菜单
const activeMenu = computed(() => {
  const route = useRoute();
  // console.log(route);
  const { path } = route;
  return path;
});

const menuProps = withDefaults(defineProps<MenuProps>(), {
  mode: "vertical",
  uniqueOpened: true,
  router: true,
  defaultActive: activeMenu.value,
  popperClass: "menu-popper",
});
</script>

<style scoped lang="scss">
.nav-scroll {
  &-menu {
    /**
    * *element plus 修改颜色变量 
    */
    // --el-menu-bg-color: #eee;
    // --el-menu-text-color: #303133;
    // --el-menu-active-color: #fafafa;
    @include nav_bg_color();
    @include nav_font_color();
    @include nav_active_font_color();
  }
}
</style>
