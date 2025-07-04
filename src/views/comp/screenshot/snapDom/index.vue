<!--
 * @Author: Komorebi
 * @Date: 2025-07-04 11:16:32
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-04 14:20:19
-->
<template>
  <div class="wrapper">使用snapDOM进行截图
    <BasicDom />
  </div>
</template>

<script setup lang="ts">
import BasicDom from "../components/BasicDom.vue";
import { snapdom } from "@zumer/snapdom";

defineOptions({ name: "snapDom" });
</script>

<style scoped lang="scss"></style>
