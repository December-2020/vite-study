<!--
 * @Author: Komorebi
 * @Date: 2024-10-12 10:18:36
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-12 10:49:45
-->
<template>
  <div class="app-main w-100% h-100%">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
