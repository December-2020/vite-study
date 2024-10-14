<!--
 * @Author: Komorebi
 * @Date: 2024-10-11 14:34:37
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-12 10:15:17
-->
<template>
  <!-- 左侧菜单模式 -->
  <div class="wrapper w-100% h-100%">
    <el-container class="w-100% h-100%">
      <el-aside width="200px">
        <NavBar />
      </el-aside>
      <el-main class="wrapper-main">
        <AppMain />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import AppMain from "./components/AppMain.vue";
</script>

<style scoped lang="scss">
.wrapper {
  &-main {
    @include background_color("content-bg-color");
    @include font_color("content-font-color");
  }
}
</style>
