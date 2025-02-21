<!--
 * @Author: Komorebi
 * @Date: 2025-02-10 11:04:12
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-21 16:58:40
-->
<template>
  <div class="wrapper">
    <div class="wrapper-title h-8 font-size-6 lh-tight p-2 b-rd-4px">
      弹窗例子
    </div>
    <div class="wrapper-content mt-4 b-rd-4px flex-1 p-2">
      <div class="item">
        <ElAlert title="基础使用" show-icon :closable="false" />
        <BaseButton @click="openModal4" class="mt-1"> 打开弹窗 </BaseButton>
      </div>
      <div class="item">
        <ElAlert title="内外数据交互" show-icon :closable="false" />
        <BaseButton @click="openModal3(true, { test: 'testData' })" class="mt-1">
          打开弹窗并传递数据
        </BaseButton>
      </div>
      <div class="item">
        <ElAlert
          title="使用动态组件的方式在页面内使用多个弹窗"
          show-icon
          :closable="false"
        />
        <div class="mt-1">
          <BaseButton @click="openModal(1)">弹窗1</BaseButton>
          <BaseButton @click="openModal(2)">弹窗2</BaseButton>
        </div>
      </div>

      <!-- 基础使用 -->
      <Modal4 @register="register4" />
      <!-- 内外数据交互 -->
      <Modal3 @register="register3" />
      <!-- 动态组件 -->
      <component
        :is="currentModal"
        v-model="compModal"
        v-if="currentModal"
      />
      <!-- 
        !bug: 
        ! 使用动态组件, 外部没有使用 register 注册时
        ! 组件内部会因 dataTransfer[uid] 为 undefined
        ! 而无法执行 useModalInner 中的回调函数
      -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import type { Nullable } from "#/global";

import Modal1 from "./components/Modal1.vue";
import Modal2 from "./components/Modal2.vue";
import Modal3 from "./components/Modal3.vue";
import Modal4 from "./components/Modal4.vue";
import { useModal } from "@/hooks/useModal";

defineOptions({ name: "CompDialog" });
/* 基础使用 */
const [register4, { openModal: openModal4 }] = useModal();

/* 内外数据交互 */
const [register3, { openModal: openModal3, closeModal: closeModal3 }] =
  useModal();
// const handleConfirm = () => {
//   console.log("confirm");
//   closeModal3();
// };

/* 动态组件 */
const compModal = ref(false);
const currentModal = shallowRef<Nullable<Component>>(null);
const openModal = (num: number) => {
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
