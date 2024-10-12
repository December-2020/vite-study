<!--
 * @Author: Komorebi
 * @Date: 2024-10-11 16:35:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-12 11:15:19
-->
<template>
  <!-- el-menu 标签下只能有 el-menu-item 或者 el-sub-menu 标签 -->
  <!-- 是否显示该路由 -->
  <template v-if="!route.meta.hidden">
    <!-- 有子路由 -->
    <template v-if="route.children && route.children.length">
      <!-- 有且仅有一个子路由 -->
      <template v-if="route.children.length === 1">
        <NavBarItem
          :route="
            Object.assign(
              {},
              {
                ...route.children[0],
                meta: {
                  ...route.meta,
                  ...route.children[0].meta,
                },
              }
            )
          "
          :base-path="resolvePath(route.path)"
        />
      </template>
      <!-- 多个子路由 -->
      <el-sub-menu
        v-else
        :index="resolvePath(route.path)"
        :class="{ 'active-route': currRoute }"
      >
        <template #title>
          <el-icon>
            <SvgIcon
              v-if="route.meta.icon"
              :icon-class="`nav-${route.meta.icon}`"
            />
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <!-- 默认插槽 -->
        <template v-for="child in route.children" :key="child.path">
          <NavBarItem :route="child" :base-path="resolvePath(route.path)" />
        </template>
      </el-sub-menu>
    </template>
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
import { useRoute } from "vue-router";

interface Props {
  route: AppRouteRecordRaw;
  basePath?: string;
}

const props = withDefaults(defineProps<Props>(), { basePath: "" });
const route = props.route;

const resolvePath = (routePath: string): string => {
  return path.resolve(props.basePath, routePath);
};

// 当前路由
const { path: routePath } = useRoute();
const currRoute = computed(() => {
  // console.log("🚀 ~ currRoute ~ path:", path);
  return !!~routePath.indexOf(resolvePath(route.path));
});
</script>
