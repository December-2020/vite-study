<!--
 * @Author: Komorebi
 * @Date: 2024-10-08 15:15:18
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-13 16:49:20
-->
<template>
  <el-switch
    class="base-switch"
    v-bind="props"
    v-model="model"
    @change="emit('change')"
  >
    <template
      v-for="(_, slotName) in $slots"
      :key="slotName"
      v-slot:[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-switch>
</template>

<script setup lang="ts">
import type { SwitchProps } from "element-plus";

type Props = Partial<SwitchProps>;

const props = withDefaults(defineProps<Props>(), {
  activeValue: true,
  inactiveValue: false,
  validateEvent: true,
});

const model = defineModel({
  default: false,
});

const emit = defineEmits(["change"]);
</script>

<style scoped lang="scss"></style>
