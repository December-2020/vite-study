<!--
 * @Author: Komorebi
 * @Date: 2025-02-10 11:04:12
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-15 16:18:20
-->
<template>
  <div class="wrapper">
    <div class="wrapper-title h-8 font-size-6 lh-tight p-2 b-rd-4px">
      弹窗例子
    </div>
    <div class="wrapper-content mt-4 b-rd-4px flex-1 p-2">
      <div class="item">
        <ElAlert title="使用BaseDialog" show-icon :closable="false" />
        <BaseButton @click="modal1 = true" class="mt-1">显示</BaseButton>
        <BaseDialog title="测试弹窗1" v-model="modal1" @close="modal1 = false">
          <Modal1 />
        </BaseDialog>
      </div>
      <div class="item">
        <ElAlert title="使用useModal" show-icon :closable="false" />
        <BaseButton @click="modal2Open" class="mt-1">显示1</BaseButton>
        <BaseDialog
          title="测试弹窗2"
          v-model="modal2Value"
          @close="modal2.close"
          @confirm="handleConfirm"
        >
          <Modal2 />
        </BaseDialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Modal1 from "./components/Modal1.vue";
import Modal2 from "./components/Modal2.vue";
import { useShowModal } from "@/hooks/useShowModal";

defineOptions({ name: "CompDialog" });

const modal1 = ref(false);
// const modal2 = ref(false);
const modal2 = useShowModal();
const modal2Value = ref(modal2.visible);
const modal2Open = () => {
  modal2.open({ test: "123" });
};
const handleConfirm = () => {
  console.log("confirm");
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
