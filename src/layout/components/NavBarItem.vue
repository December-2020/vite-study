<!--
 * @Author: Komorebi
 * @Date: 2024-10-11 16:35:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-11 16:48:33
-->
<template>
  <!-- el-menu 标签下只能有 el-menu-item 或者 el-sub-menu 标签 -->
  <!-- 是否显示该路由 -->
  <template v-if="!route.meta.hidden">
    <!-- 有子路由 -->
    <template v-if="route.children && route.children.length"> </template>
    <!-- 无子路由 -->
    <el-menu-item v-else :index="resolvePath(route.path)">
      <el-icon>
        <SvgIcon
          v-if="route.meta.icon"
          :icon-class="`nav-${route.meta.icon}`"
        />
      </el-icon>
      <template #title>{{ route.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { AppRouteRecordRaw } from "#/route";

import path from "path-browserify";

interface Props {
  route: AppRouteRecordRaw;
  basePath?: string;
}

const props = withDefaults(defineProps<Props>(), { basePath: "" });
const route = props.route;

const resolvePath = (routePath: string): string => {
  return path.resolve(props.basePath, routePath);
};
</script>
