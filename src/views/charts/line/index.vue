<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:08:25
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-22 17:02:59
-->
<template>
  <div class="wrapper">
    <div class="wrapper-top">
      <el-space  wrap>
        <el-card
          v-for="item in lineData?.countList"
          :key="item.id"
          class="box-card"
        >
          <template #header>
            <div class="card-header">
              <span>{{ item.title }}</span>
              <el-button class="button" text>{{ item.type }}</el-button>
            </div>
          </template>
          <div class="card-body">
            <div class="card-body-row">
              下单量: {{ item.orders }}
            </div>
            <div class="card-body-row">
              总计: {{ item.total }}
            </div>
          </div>
        </el-card>
      </el-space>
    </div>
    <div class="wrapper-content"></div>
  </div>
</template>

<script setup lang="ts">
import type { LineData } from "#Api/charts";

import API from "@/apis/demo/charts";

const lineData = ref<LineData>();
const getLineData = async () => {
  const res = await API.Get_Line_Data();
  lineData.value = res.data as LineData;
  console.log("🚀 ~ getLineData ~ res:", lineData.value);
};

onMounted(async () => {
  await getLineData();
});
</script>

<style scoped lang="scss"></style>
