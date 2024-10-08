<!--
 * @Author: Komorebi
 * @Date: 2024-10-08 16:42:53
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-08 17:09:11
-->
<template>
    <BaseSwitch v-model="isDark" @click="toggleDark"></BaseSwitch>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);

</script>

<style scoped lang="scss"></style>
