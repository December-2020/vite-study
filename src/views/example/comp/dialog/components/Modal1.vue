<template>
  <div class="wrapper">
    <h2>Modal1测试弹窗</h2>
    <BaseButton @click="modal1_1 = true">显示</BaseButton>
    <h3 v-for="(item, index) in 20" :key="index">{{ item }}</h3>

    <BaseDialog title="测试弹窗1-1" v-model="modal1_1" @close="modal1_1 = false">
      <Modal1_1 />
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import Modal1_1 from "./Modal1_1.vue";

const modal1_1 = ref(false);
</script>

<style scoped lang="scss"></style>
