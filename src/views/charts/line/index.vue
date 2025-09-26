<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:08:25
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-26 16:50:11
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
              <el-tag :type="TagTypeFn(item.type)">{{ item.type }}</el-tag>
            </div>
          </template>
          <div class="card-body">
            <div>{{ $t("Chart.line.orderQuantity") }}:</div>
            <div>{{ item.orders }}</div>
            <div>{{ $t("Chart.line.total") }}:</div>
            <div>{{ item.total }}</div>
          </div>
        </el-card>
      </el-space>
    </div>
    <div class="wrapper-content py-4">
      <div class="wrapper-content-line h-300px border-rd-4px overflow-hidden">
        <div ref="chartRef" class="h-100%"></div>
      </div>
      <div class="wrapper-content-pie-list mt-4 gap-col-4">
        <div class="border-rd-4px overflow-hidden">
          <div ref="pieRef" class="h-60"></div>
        </div>
        <!-- 由于提示弹窗太长, 移动端不能设置隐藏 -->
        <div class="border-rd-4px">
          <div ref="radarRef" class="h-60"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LineData } from "#Api/charts";

import API from "@/apis/demo/charts";
// import store from "@/store";
// import { storeToRefs } from "pinia";
import { useECharts } from "@/hooks/useECharts";
import { useI18n } from "@/hooks/useI18n";

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
  // console.log("🚀 ~ getLineData ~ res:", lineData.value);
};

type TagValue = "年" | "季" | "月" | "周" | "日";
type TagType = "success" | "warning" | "primary" | "danger" | "info";
const Tag = {
  年: "success",
  季: "warning",
  月: "primary",
  周: "danger",
  日: "info",
} as Record<TagValue, TagType>;
const TagTypeFn = (type: TagValue) => {
  return Tag[type];
};

// 折线-柱状混合图
const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

// 饼状图
// const pieHeight = computed(() => {
//   const { isPC } = storeToRefs(store.appSet);
//   let { clientWidth } = document.documentElement;
//   return `${isPC.value ? 300 : clientWidth}px`;
// });
const pieRef = ref<HTMLDivElement | null>(null);
const { setOptions: setPieOptions } = useECharts(pieRef as Ref<HTMLDivElement>);

// 雷达图
const radarRef = ref<HTMLDivElement | null>(null);
const { setOptions: setRadarOptions } = useECharts(
  radarRef as Ref<HTMLDivElement>
);

onMounted(async () => {
  await getLineData();

  let dayList = lineData.value?.dayList || [];
  let dayLength = dayList.length;
  let dayStartIndex = dayLength - 9 > 0 ? dayLength - 9 : 0;
  // 折线-柱状混合图配置
  setOptions({
    // xAxis: {
    //   type: "category",
    //   data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    // },
    // yAxis: {
    //   type: "value",
    // },
    // series: [
    //   {
    //     data: [150, 230, 224, 218, 135, 147, 260],
    //     type: "line",
    //   },
    // ],

    /* 使用数据集 */
    tooltip: { trigger: "axis" },
    // 横坐标是类目型
    xAxis: { type: "category" },
    // 纵坐标是数值型
    yAxis: { type: "value" },
    /**
     * 直角坐标系内绘图网格
     * 减少 svg 与 父盒子间的间距
     */
    grid: {
      left: "2%",
      right: "2%",
      top: "4%",
      bottom: "4%",
      containLabel: true,
    },
    series: [
      { type: "line", name: useI18n(`Chart.line.number`) },
      { type: "bar", name: useI18n(`Chart.line.price`) },
    ],
    // 图表缩放
    dataZoom: [
      {
        type: "inside", // 这个 dataZoom 组件是 inside 型 dataZoom 组件
        xAxisIndex: 0, //这里是从X轴的0刻度开始
        startValue: dayStartIndex, // 从头开始。
        endValue: dayStartIndex + 9, // 一次性展示8个。
      },
    ],
    // // 图例
    // legend:{
    //   orient:'vertical',
    //   right:10,
    //   top:20,
    // },
    // @ts-ignore
    dataset: {
      dimensions: ["day", "num", "price"],
      source: dayList,
    },
    /**
     * 仅移动端
     * 为什么不用 store?
     * 1. store 是较为精确的判断, 手机横屏不会判断为pc端
     * 2. 这里可以通过手机屏幕的宽度来进行大概判断
     */
    media: [
      {
        query: { maxWidth: 675 },
        option: {
          xAxis: {
            // boundaryGap: true, // 坐标轴两边留白策略
            axisTick: {
              // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
              alignWithLabel: true,
              // 坐标轴刻度的显示间隔
              interval: 0,
            },
          },
          dataZoom: [
            {
              // 从末尾数起
              startValue: dayLength - 5 > 0 ? dayLength - 5 : 0,
              // 一次性展示5个
              endValue: dayLength - 1 > 0 ? dayLength - 1 : 0,
            },
          ],
        },
      },
    ],
  });
  // 饼状图配置
  setPieOptions({
    title: {
      text: useI18n(`Chart.line.languageProportion`),
      textStyle: { fontSize: 14 },
    },
    legend: { show: false },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        // 用于 tooltip 标题
        name: useI18n(`Chart.line.languageProportion`),
        type: "pie",
        radius: "74%",
        center: ["50%", "54%"],
        // color: ["#5ab1ef", "#b6a2de", "#67e0e3", "#2ec7c9"],
        label: {
          show: true,
        },
      },
    ],
    media: [
      {
        /**
         * 移动端是小于 675
         * 这里是放了2个饼图
         * 需要除以2 ?
         */
        query: { maxWidth: 337 },
        option: {
          legend: { bottom: "-1%", left: "center", show: true },
          series: [
            {
              center: ["50%", "50%"],
              label: {
                show: false,
              },
            },
          ],
        },
      },
    ],
    // @ts-ignore
    dataset: {
      dimensions: ["name", "value"],
      // source: [
      //   { value: 4400, name: "Vue" },
      //   { value: 3000, name: "TypeScript" },
      //   { value: 500, name: "Scss" },
      //   { value: 400, name: "HTML" },
      // ].sort(function (a, b) {
      //   return b.value - a.value;
      // }),
      source: lineData.value?.typeList || [],
    },
  });
  // 雷达图配置
  setRadarOptions({
    title: {
      text: useI18n(`Chart.line.abilityRadar`),
      textStyle: { fontSize: 16 },
    },
    tooltip: {},
    radar: {
      // 雷达图的指示器
      indicator: [
        { name: useI18n(`Chart.line.radar.sale`), max: 5 },
        { name: useI18n(`Chart.line.radar.manage`), max: 5 },
        { name: useI18n(`Chart.line.radar.informationTechnology`), max: 5 },
        { name: useI18n(`Chart.line.radar.customerService`), max: 5 },
        { name: useI18n(`Chart.line.radar.researchAndDevelopment`), max: 5 },
        { name: useI18n(`Chart.line.radar.market`), max: 5 },
      ],
    },
    series: [
      {
        type: "radar",
        // 雷达图的数据
        data: [
          {
            value: lineData.value?.skillList || [],
            name: useI18n(`Chart.line.capacityAllocation`),
          },
        ],
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
        --el-card-padding: 14px;
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
            grid-template-rows、
            grid-template-columns、
            grid-template-areas
            三个属性的简写
          */
          grid-template: repeat(2, 1fr) / 3fr 1fr;
          // grid-template-rows: repeat(2, 1fr);
          // grid-template-columns: 3fr 1fr;
          row-gap: 10px;
          div {
            &:nth-child(2n) {
              text-align: right;
            }
          }
        }
      }
    }
  }
  &-content {
    &-pie-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
    }
  }
}
</style>
