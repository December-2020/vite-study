/*
 * @Author: Komorebi
 * @Date: 2024-12-18 14:42:29
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-12-24 15:54:58
 */
import type { EChartsOption } from "echarts";
import type { Ref } from "vue";

import store from "@/store";
import echarts from "@/utils/echarts";
import { tryOnUnmounted } from "@vueuse/core";

export function useECharts(elRef: Ref<HTMLDivElement>) {
  /**
   * dark、customed 都是echarts的内置主题
   * 详情参考: https://echarts.apache.org/zh/theme-builder.html
   */
  const theme = computed(() =>
    store.appSet.isDarkTheme ? "dark" : "customed"
  );
  //   watch(
  //     () => theme.value,
  //     (newVal) => {
  //       console.log("🚀 ~ watch ~ newVal:", newVal);
  //     }
  //   );

  // 图表实例
  let chartInstance: echarts.ECharts | null = null;
  // 重置图表大小
  let resizeFn: Fn = resize;
  // 图表配置
  const chartOptions = ref({}) as Ref<EChartsOption>;
  // 移除重置图表大小
  let removeResizeFn: Fn = () => {};

  // const getOptions = computed(() => {
  //   if (theme.value !== "dark") {
  //     return chartOptions.value as EChartsOption;
  //   }
  //   return {
  //     backgroundColor: "transparent",
  //     ...chartOptions.value,
  //   } as EChartsOption;
  // });

  // 初始化图表
  function initCharts() {
    /**
     * unref 计算的一个语法糖
     * 如果参数是ref, 则返回内部值, 否则返回参数本身
     * val = isRef(val) ? val.value : val
     */
    const el = unref(elRef);
    if (!el || !unref(el)) return;

    chartInstance = echarts.init(el, theme);
  }
  // 获取图表实例
  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts;
    }
    return chartInstance;
  }
  /**
   * 这里 options 的类型为Echarts下的
   * 可能要用上 #/echarts 中的类型?
   */
  // 配置选项
  function setOptions(options: EChartsOption, clear = true) {
    chartOptions.value = options;
  }
  function resize() {
    chartInstance?.resize();
  }

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  return {
    getInstance,
    setOptions,
  };
}
