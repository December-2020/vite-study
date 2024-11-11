<!--
 * @Author: Komorebi
 * @Date: 2024-10-12 10:18:36
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-11 10:54:04
-->
<template>
  <div class="app-main w-100% h-100%">
    <router-view v-slot="{ Component }">
      <Transition
        name="custom-classes"
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutUp"
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
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
