<!--
 * @Author: Komorebi
 * @Date: 2024-11-25 15:46:17
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-12-02 15:50:05
-->
<template>
  <el-skeleton style="width: 240px" v-bind="props"></el-skeleton>
</template>

<script setup lang="ts">
import type { SkeletonProps } from "element-plus";

const props = withDefaults(defineProps<SkeletonProps>(), {
  animated: true,
});
</script>

<style scoped lang="scss"></style>
