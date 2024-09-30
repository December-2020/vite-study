<!--
 * @Author: Komorebi
 * @Date: 2024-09-29 16:29:45
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-30 13:53:41
-->
<template>
  <component :is="h(ElButton, props, $slots)" />
</template>

<script setup lang="ts">
import type { Component } from "vue";

import { h } from "vue";
import { ElButton } from "element-plus";

interface Props {
  size?: "large" | "default" | "small";
  type?: "" | "primary" | "success" | "warning" | "danger" | "info";
  plain?: boolean;
  text?: boolean;
  bg?: boolean;
  link?: boolean;
  round?: boolean;
  circle?: boolean;
  loading?: boolean;
  loadingIcon?: string | Component;
  disabled?: boolean;
  icon?: string | Component;
  autofocus?: boolean;
  nativeType?: "button" | "submit" | "reset";
  autoInsertSpace?: boolean;
  color?: string;
  dark?: boolean;
  tag?: string | Component;
}

const props = withDefaults(defineProps<Props>(), {
  type: "primary",
});
</script>
