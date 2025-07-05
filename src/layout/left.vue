<!--
 * @Author: Komorebi
 * @Date: 2024-10-11 14:34:37
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-05 09:50:46
-->
<template>
  <!-- 左侧菜单模式 -->
  <div class="wrapper w-100% h-100%">
    <el-container class="w-100% h-100% flex">
      <!-- 为什么不用? 还需要自己写过渡动画, 就放弃了 -->
      <!-- <el-aside v-if="store.appSet.isPC" class="!w-auto"> -->
      <NavBar v-if="store.appSet.isPC" />
      <!-- </el-aside> -->
      <!-- 移动端菜单 -->
      <el-drawer
        v-else
        direction="ltr"
        size="60%"
        :show-close="false"
        :with-header="false"
        :modelValue="store.appSet.isCollapse"
        @close="closeDrawer"
      >
        <NavBar @menu-click="closeDrawer" />
      </el-drawer>
      <!-- 移动端菜单 end -->

      <el-container class="flex-1">
        <el-header class="wrapper-head b-b-1 b-b-solid">
          <AppHead
            showCollapse
            class="wrapper-head-app h-48px pr-16px b-b-1 b-b-solid"
          />
          <TabPane />
        </el-header>
        <!-- 这里的id是为 NProgress 准备的 -->
        <!-- pr-0 是为了清除 main 中滚动条不贴边的问题 -->
        <el-main class="wrapper-main !pr-0" id="app-main">
          <el-scrollbar class="pr-20px">
            <AppMain />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import AppMain from "./components/AppMain.vue";
import AppHead from "./components/AppHead.vue";
import TabPane from "./components/TabPane.vue";
import store from "@/store";

const closeDrawer = () => {
  store.appSet.setIsCollapse(false);
};
</script>

<style scoped lang="scss">
.wrapper {
  &-head {
    --el-header-height: auto;
    --el-header-padding: 0;
    border-color: var(--content-border-color);
    &-app {
      border-color: var(--content-border-color);
    }
  }
  &-main {
    background-color: var(--content-bg-color);
    color: var(--content-font-color);
  }
}
</style>
