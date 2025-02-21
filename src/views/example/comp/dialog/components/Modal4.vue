<template>
  <BaseDialog title="基础使用" @register="registerModal" hide-footer>
    <h2>测试弹窗4</h2>
    <BaseButton @click="closeModal">内部关闭弹窗</BaseButton>
  </BaseDialog>
</template>

<script setup lang="ts">
import { useModalInner } from "@/hooks/useModal";

const [registerModal, { closeModal }] = useModalInner();
</script>

<style scoped lang="scss"></style>
