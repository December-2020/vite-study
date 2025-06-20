<!--
 * @Author: Komorebi
 * @Date: 2025-03-28 09:31:40
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-06-20 15:37:56
-->
<template>
  <div class="wrapper">
    <TinymceEditor v-model="editorVal" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "CompEditor" });

const editorVal = ref("测试");
</script>

<style scoped lang="scss"></style>
