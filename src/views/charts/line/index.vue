<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:08:25
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-02 14:46:24
-->
<template>
  <div class="wrapper">
    <div class="wrapper-top">
      <el-space wrap>
        <el-card
          v-for="item in lineData?.countList"
          :key="item.id"
          class="box-card"
        >
          <template #header>
            <div class="card-header">
              <div>{{ item.title }}</div>
              <el-tag type="success">{{ item.type }}</el-tag>
            </div>
          </template>
          <div class="card-body">
            <!-- <div class="card-body-row">下单量: {{ item.orders }}</div>
            <div class="card-body-row">总计: {{ item.total }}</div> -->
            <div>下单量:</div>
            <div>{{ item.orders }}</div>
            <div>总计:</div>
            <div>{{ item.total }}</div>
          </div>
        </el-card>
      </el-space>
    </div>
    <div class="wrapper-content h-300px">
      <div ref="chartRef" class="h-100%"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LineData } from "#Api/charts";

import API from "@/apis/demo/charts";
import { useECharts } from "@/hooks/useECharts";

/**
 * 在 3.2.34 或以上的版本中，
 * 使用 <script setup> 的单文件组件会自动根据文件名生成对应的 name 选项，
 * 即使是在配合 <KeepAlive> 使用时也无需再手动声明。
 *
 * * 仅在3.3+中支持
 */
defineOptions({ name: "Line" });

const lineData = ref<LineData>();
const getLineData = async () => {
  const res = await API.Get_Line_Data();
  lineData.value = res.data as LineData;
  console.log("🚀 ~ getLineData ~ res:", lineData.value);
};

const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

onMounted(async () => {
  await getLineData();

  setOptions({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.wrapper {
  &-top {
    :deep(.el-space) {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      // 自动换行
      // grid-auto-flow: row dense;
      .box-card {
        .card-header {
          display: flex;
          justify-content: space-between;
          & > div {
            line-height: 32px;
            font-weight: bold;
          }
        }
        .card-body {
          display: grid;
          /* 
            grid-template-columns、
            grid-template-rows、
            grid-template-areas
            三个属性的简写
          */
          grid-template: repeat(2, 1fr) / repeat(2, 1fr);
          // grid-template-columns: repeat(2, 1fr);
          // grid-template-rows: repeat(2, 1fr);
          row-gap: 5px;
          div {
            &:nth-child(2n) {
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>
