<!--
 * @Author: Komorebi
 * @Date: 2025-02-12 14:09:20
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-12 14:16:32
-->
<template>
    <div class="wrapper">
      Modal1-1嵌套的测试弹窗
      <h3 v-for="(item, index) in 10" :key="index">{{ item }}</h3>
    </div>
  </template>
  
  <script setup lang="ts"></script>
  
  <style scoped lang="scss"></style>
  