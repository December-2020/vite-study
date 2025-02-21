<!--
 * @Author: Komorebi
 * @Date: 2025-02-10 11:04:12
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-21 10:49:38
-->
<template>
  <div class="wrapper">
    <div class="wrapper-title h-8 font-size-6 lh-tight p-2 b-rd-4px">
      弹窗例子
    </div>
    <div class="wrapper-content mt-4 b-rd-4px flex-1 p-2">
      <div class="item">
        <ElAlert title="基础使用" show-icon :closable="false" />
        <BaseButton @click="openModal(1)" class="mt-1">显示</BaseButton>
      </div>
      <div class="item">
        <ElAlert title="基础使用2" show-icon :closable="false" />
        <BaseButton @click="openModal(2)" class="mt-1">显示1</BaseButton>
      </div>
      <div class="item">
        <ElAlert title="使用useModal" show-icon :closable="false" />
        <BaseButton @click="openModal3(true, { test: '123' })" class="mt-1">
          显示2
        </BaseButton>
      </div>

      <!-- <BaseDialog
        v-model="modal"
        @close="modal = false"
        @confirm="handleConfirm"
        :title="modalTitle"
      >
    </BaseDialog> -->
      <component :is="currentModal" v-model="compModal" v-if="currentModal" />

      <Modal3 @register="register3" @confirm="handleConfirm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import type { Nullable } from "#/global";

import Modal1 from "./components/Modal1.vue";
import Modal2 from "./components/Modal2.vue";
import Modal3 from "./components/Modal3.vue";
import { useModal } from "@/hooks/useModal";

defineOptions({ name: "CompDialog" });

const compModal = ref(false);
const currentModal = shallowRef<Nullable<Component>>(null);

const [register3, { openModal: openModal3, closeModal: closeModal3 }] =
  useModal();
// console.log("🚀 ~ register:", register)

const openModal = (num: number) => {
  console.log("openModal");
  switch (num) {
    case 1:
      currentModal.value = Modal1;
      break;
    case 2:
      currentModal.value = Modal2;
      break;
  }
  nextTick(() => {
    compModal.value = true;
  });
};
const handleConfirm = () => {
  console.log("confirm");
  closeModal3();
};
</script>

<style scoped lang="scss">
.wrapper {
  &-title,
  &-content {
    @include background_color("content-font-bg-color");
  }

  &-content {
    .item {
      &:not(:first-child) {
        margin-top: 20px;
      }
    }
  }
}
</style>
