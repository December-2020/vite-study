<template>
  <div class="wrapper">
    login page
    <BaseButton text type="success"></BaseButton>
    <BaseButton :icon="Check">2222</BaseButton>
    <BaseInput v-model="val" />
  </div>
</template>

<script setup lang="ts">
import { Check } from "@element-plus/icons-vue";
const val = ref("");
watchEffect(() => console.log(val.value));
</script>

<style scoped lang="scss">
.wrapper {
  .text {
    width: 300px;
  }
}
</style>
