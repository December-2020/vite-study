<!--
 * @Author: Komorebi
 * @Date: 2025-02-10 11:04:12
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-11 16:34:37
-->
<template>
  <div class="wrapper">
    <div class="wrapper-title h-8 font-size-6 lh-tight p-2 b-rd-4px">
      弹窗例子
    </div>
    <div class="wrapper-content mt-4 b-rd-4px flex-1">
      <div class="item">
        <ElAlert title="使用BaseDialog" show-icon :closable="false" />
        <BaseButton @click="modal1 = true">显示</BaseButton>
        <BaseDialog title="测试弹窗1" v-model="modal1">
          <Modal1 />
        </BaseDialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Modal1 from "./components/Modal1.vue";

defineOptions({ name: "CompDialog" });

const modal1 = ref(false);
</script>

<style scoped lang="scss">
.wrapper {
  &-title,
  &-content {
    @include background_color("content-font-bg-color");
  }
}
</style>
