<template>
  <div class="wrapper">
    <h2>Modal1测试弹窗</h2>
    <BaseButton @click="modal1_1 = true">显示</BaseButton>

    <div>
      <BaseSwitch v-model="switchVal">
        <template #active-action>
          <span class="custom-active-action">T</span>
        </template>
        <template #inactive-action>
          <span class="custom-inactive-action">F</span>
        </template>
      </BaseSwitch>
      <ElSwitch
        v-model="switchVa2"
        :active-action-icon="View"
        :inactive-action-icon="Hide"
      />
    </div>

    <h3 v-for="(item, index) in 20" :key="index">{{ item }}</h3>

    <BaseDialog
      title="测试弹窗1-1"
      v-model="modal1_1"
      @close="modal1_1 = false"
    >
      <Modal1_1 />
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import Modal1_1 from "./Modal1_1.vue";
import { Hide, View } from '@element-plus/icons-vue'

const modal1_1 = ref(false);
const switchVal = ref(true);
const switchVa2 = ref(false);
</script>

<style scoped lang="scss"></style>
