<!--
 * @Author: Komorebi
 * @Date: 2024-10-12 10:18:36
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-12 13:56:49
-->
<template>
  <div class="app-main w-100% h-100%">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
// .app-main {
//   @include background_color("content-bg-color");
//   @include font_color("content-font-color");
// }
</style>
