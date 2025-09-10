<!--
 * @Author: Komorebi
 * @Date: 2024-10-12 09:33:16
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-10 14:00:11
-->
<template>
  <div class="wrapper">
    测试页面11111111111

    <div>
      <BaseInput
        width="300"
        clearable
        v-model="testIptVal"
        @clear="handleClear"
      >
        <template #prepend>Http://</template>
        <template #append>.com</template>
      </BaseInput>

      <p>仅能填正整数</p>
      <BaseInput  v-model.nonnegative="testIptVal1" />

      <p>可填整数、小数</p>
      <BaseInput  v-model.decimal="testIptVal2" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "Test-1" });

const testIptVal = ref("");
const handleClear = () => {
  console.log("clear");
};

const testIptVal1 = ref("");

const testIptVal2 = ref("");
</script>

<style scoped lang="scss"></style>
