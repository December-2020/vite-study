<!--
 * @Author: Komorebi
 * @Date: 2025-02-18 16:59:49
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-19 09:58:22
-->
<template>
  <BaseDialog title="弹窗标题3" @register="registerModal">
    <h2>测试弹窗3</h2>
  </BaseDialog>
</template>

<script setup lang="ts">
import { useModalInner } from "@/hooks/useModal";

onMounted(() => {
  console.log("发出请求");
});

const [registerModal, {}] = useModalInner(async (data) => {
  console.log("🚀 ~ useModalInner ~ data:", data);
});
</script>

<style scoped lang="scss"></style>
