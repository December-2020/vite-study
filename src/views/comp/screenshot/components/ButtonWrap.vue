<!--
 * @Author: Komorebi
 * @Date: 2025-07-05 14:22:59
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-19 13:58:20
-->
<template>
  <div class="wrapper flex">
    <BaseButton @click="() => emits('capture')" plain>
      {{ $t("Comp.screenshot.capture") }}
    </BaseButton>
    <BaseButton @click="() => emits('download')" plain>
      {{ $t("Comp.screenshot.download") }}
    </BaseButton>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["capture", "download"]);
</script>

<style scoped lang="scss"></style>
