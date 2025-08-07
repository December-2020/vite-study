<!--
 * @Author: Komorebi
 * @Date: 2025-02-26 14:48:51
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-26 14:49:22
-->
<template>
  <el-card class="base-card" v-bind="props">
    <template
      v-for="(_, slotName) in slotNames"
      :key="slotName"
      v-slot:[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from "vue";
import type { CardProps } from "element-plus";

interface Props extends ExtractPublicPropTypes<CardProps> {}

const props = withDefaults(defineProps<Props>(), {});

const slotNames = defineSlots();
</script>
