<!--
 * @Author: Komorebi
 * @Date: 2024-10-11 16:35:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-28 15:42:05
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
          @menu-click="emit('menu-click')"
        />
      </template>
      <!-- 多个子路由 -->
      <el-sub-menu
        v-else
        :index="resolvePath(route.path)"
        :class="{ 'active-route': currRoute }"
      >
        <template #title>
          <el-icon v-if="store.appSet.isPC">
            <SvgIcon
              v-if="route.meta.icon"
              :icon-class="`nav-${route.meta.icon}`"
            />
          </el-icon>
          <span>{{ $t(`Route.${route.meta.title}`) }}</span>
        </template>
        <!-- 默认插槽 -->
        <template v-for="child in route.children" :key="child.path">
          <NavBarItem
            :route="child"
            :base-path="resolvePath(route.path)"
            @menu-click="emit('menu-click')"
          />
        </template>
      </el-sub-menu>
    </template>
    <!-- 无子路由 -->
    <!-- 监听原生事件 -->
    <el-menu-item
      v-else
      :index="resolvePath(route.path)"
      @click="menuClick"
    >
      <el-icon v-if="store.appSet.isPC">
        <SvgIcon
          v-if="route.meta.icon"
          :icon-class="`nav-${route.meta.icon}`"
        />
      </el-icon>
      <template #title>{{ $t(`Route.${route.meta.title}`) }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { AppRouteRecordRaw } from "#/route";

import path from "path-browserify";
import store from "@/store";
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
  return !!~routePath.indexOf(resolvePath(route.path));
});

// 菜单点击事件
// 点击菜单后收起菜单
const emit = defineEmits(["menu-click"]);
/**
 * !递归组件中必须书写多次
 */
const menuClick = () => {
  // 仅在移动端触发
  if(store.appSet.isPC) return;
  emit("menu-click");
};
</script>

