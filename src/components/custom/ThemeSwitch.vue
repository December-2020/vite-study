<!--
 * @Author: Komorebi
 * @Date: 2024-10-08 16:42:53
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-10 14:36:38
-->
<template>
  <BaseSwitch
    :modelValue="isDark"
    @click="toggleDark()"
    class="theme-switch"
    :active-value="true"
    :inactive-value="false"
    inline-prompt
    :active-icon="Sun"
    :inactive-icon="Moon"
  ></BaseSwitch>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import Sun from "@/components/once/SvgSun.vue";
import Moon from "@/components/once/SvgMoon.vue";

/** 
 * *在没有该组件的页面刷新, 会丢失主题
 */
const isDark = useDark({
  selector: "html",
  attribute:"class",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
</script>

<style scoped lang="scss">
.theme-switch {
  /**
   * *element plus 修改颜色变量 
   */
  --el-switch-on-color: #eee;
  --el-switch-off-color: #303133;
  // --el-switch-border-color: #fafafa;
}
</style>
