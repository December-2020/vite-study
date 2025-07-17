<!--
 * @Author: Komorebi
 * @Date: 2025-07-05 14:22:59
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-05 14:23:12
-->
<template>
  <div class="wrapper flex">
    <BaseButton @click="() => emits('capture')">
      {{ $t("Comp.screenshot.capture") }}
    </BaseButton>
    <BaseButton @click="() => emits('download')" plain>
      {{ $t("Comp.screenshot.download") }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["capture", "download"]);
</script>

<style scoped lang="scss"></style>
