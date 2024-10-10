<!--
 * @Author: Komorebi
 * @Date: 2024-10-08 16:42:53
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-10 14:24:12
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

const isDark = useDark({
  selector: "html",
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
  --el-switch-off-color: #1b1b1f;
  --el-switch-border-color: #fafafa;
}
</style>
