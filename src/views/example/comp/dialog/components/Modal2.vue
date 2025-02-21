<!--
 * @Author: Komorebi
 * @Date: 2025-02-12 15:46:45
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-13 10:02:31
-->
<template>
  <BaseDialog title="弹窗1" @register="registerModal" v-bind="$attrs">
    <h2>用户信息</h2>
  </BaseDialog>
</template>

<script setup lang="ts">
import { useModalInner } from "@/hooks/useModal";

const [registerModal] = useModalInner();
</script>

<style scoped lang="scss"></style>
