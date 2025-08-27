<!--
 * @Author: Komorebi
 * @Date: 2024-10-12 09:33:16
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-08-27 14:32:19
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
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "Test-1" });

const testIptVal = ref("");
const handleClear = () => {
  console.log("clear");
};
</script>

<style scoped lang="scss"></style>
