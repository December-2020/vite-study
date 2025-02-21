<!--
 * @Author: Komorebi
 * @Date: 2025-02-12 14:09:20
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-21 14:14:08
-->
<template>
  <BaseDialog title="弹窗1-1" @register="registerModal" hideFooter>
    <h2>Modal1-1嵌套的测试弹窗</h2>
    <h3 v-for="(item, index) in 15" :key="index">标题{{ item }}</h3>
  </BaseDialog>
</template>

<script setup lang="ts">
import { useModalInner } from "@/hooks/useModal";

const [registerModal] = useModalInner();
</script>

<style scoped lang="scss"></style>
