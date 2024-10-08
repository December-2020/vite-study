<template>
  <el-switch
    class="base-switch"
    v-model="model"
    v-bind="props"
    @change="emit('change')"
  >
    <template v-for="(_, slot) in $slots" :key="slot" v-slot:[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps"></slot>
    </template>
  </el-switch>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import type { ComponentSize } from "element-plus";

interface Props {
  disabled?: boolean;
  loading?: boolean;
  size?: ComponentSize;
  width?: number | string;
  inlinePrompt?: boolean;
  activeIcon?: string | Component;
  inactiveIcon?: string | Component;
  activeActionIcon?: string | Component;
  inactiveActionIcon?: string | Component;
  activeText?: string;
  inactiveText?: string;
  activeValue?: boolean | string | number;
  inactiveValue?: boolean | string | number;
  name?: string;
  validateEvent?: boolean;
  //   beforeChange?: boolean | (() => Promise<boolean>);
  id?: string;
  tabindex?: string | number;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  //   size:"small"
});

const model = defineModel({
  default: false,
});

const emit = defineEmits(["change"]);
</script>

<style scoped lang="scss"></style>
