<!--
 * @Author: Komorebi
 * @Date: 2024-10-08 15:15:18
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-14 09:28:08
-->
<template>
  <el-switch
    class="base-switch"
    v-bind="props"
    v-model="model"
    @change="emit('change')"
  >
    <template
      v-for="(_, slotName) in slotNames"
      :key="slotName"
      v-slot:[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-switch>
</template>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from "vue";
import type { SwitchProps } from "element-plus";

interface Props extends ExtractPublicPropTypes<SwitchProps> {}

const props = withDefaults(defineProps<Props>(), {
  activeValue: true,
  inactiveValue: false,
  validateEvent: true,
});

/**
 * 获取slots的名称
 *
 * defineSlots() 会返回一个对象，对象的 key 是 slot 的名称，value 是一个函数
 * 仅在 3.3.0+ 版本可用
 *
 * useSlots() 会返回一个函数，函数的参数是 slot 的名称，返回值是一个数组
 * 等价于 setupContext.slots
 */
const slotNames = defineSlots();
// const slotNames = useSlots() as Record<string, (...args: any[]) => VNode[]>;

const model = defineModel({
  default: false,
});

const emit = defineEmits(["change"]);
</script>
