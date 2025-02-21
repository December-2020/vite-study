<!--
 * @Author: Komorebi
 * @Date: 2025-02-12 14:09:20
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-12 14:16:32
-->
<template>
  <BaseDialog title="弹窗1-1" @register="registerModal">
    Modal1-1嵌套的测试弹窗
    <h3 v-for="(item, index) in 10" :key="index">{{ item }}</h3>
  </BaseDialog>
</template>

<script setup lang="ts">
import { useModalInner } from "@/hooks/useModal";

const [registerModal] = useModalInner();
</script>

<style scoped lang="scss"></style>
