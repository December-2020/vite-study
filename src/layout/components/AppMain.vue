<!--
 * @Author: Komorebi
 * @Date: 2024-10-12 10:18:36
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-16 14:46:27
-->
<template>
  <div class="app-main w-100% h-100%">
    <RouterView v-slot="{ Component, route }">
      <Transition
        name="custom-classes"
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutUp"
        mode="out-in"
      >
        <KeepAlive :include="store.appSet.getCacheTabList">
          <Component :is="Component" :key="route.fullPath" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
</script>

<style scoped lang="scss">
// .app-main {
//   @include background_color("content-bg-color");
//   @include font_color("content-font-color");
// }
</style>
