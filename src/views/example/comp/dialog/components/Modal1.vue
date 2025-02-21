<template>
  <BaseDialog title="弹窗1" @register="registerModal" v-bind="$attrs">
    <h2>Modal1测试弹窗</h2>
    <BaseButton @click="openModal1">显示</BaseButton>

    <h3 v-for="(item, index) in 20" :key="index">{{ item }}</h3>
    <!-- <BaseDialog
      title="测试弹窗1-1"
      v-model="modal1_1"
      @close="modal1_1 = false"
      hideFooter
    >
  </BaseDialog> -->
  </BaseDialog>

  <Modal1_1 @register="registerModal1" />
</template>

<script setup lang="ts">
import Modal1_1 from "./Modal1_1.vue";
import { useModalInner, useModal } from "@/hooks/useModal";

const [registerModal] = useModalInner();
const [registerModal1, { openModal: openModal1 }] = useModal();
</script>

<style scoped lang="scss"></style>
