<!--
 * @Author: Komorebi
 * @Date: 2024-10-12 09:33:16
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-10 16:55:05
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

      <p>可填整数、小数</p>
      <BaseInput  v-model.decimal="testIptVal2" />

      <p>原生的number</p>
      <BaseInput  v-model.number="testIptVal3" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "Test-1" });

const testIptVal = ref("");
const handleClear = () => {
  console.log("clear");
};

const testIptVal2 = ref("");
const testIptVal3 = ref("");
</script>

<style scoped lang="scss"></style>
