<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:08:25
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-22 16:29:07
-->
<template>
  <div class="wrapper"></div>
</template>

<script setup lang="ts">
import type { LineData } from "#Api/charts";

import API from "@/apis/demo/charts";

const lineData = ref();
const getLineData = async () => {
  const res = await API.Get_Line_Data();
  lineData.value = res.data as LineData;
  console.log("🚀 ~ getLineData ~ res:", res);
};

onMounted(async () => {
  await getLineData();
});
</script>

<style scoped lang="scss"></style>
