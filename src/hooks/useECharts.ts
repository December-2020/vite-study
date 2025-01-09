/*
 * @Author: Komorebi
 * @Date: 2024-12-18 14:42:29
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-09 13:42:18
 */
import type { EChartsOption } from "echarts";
import type { Ref } from "vue";

import store from "@/store";
import echarts from "@/utils/echarts";
import { tryOnUnmounted, useTimeoutFn } from "@vueuse/core";
import { useEventListener } from "@/hooks/useEventListener";

export function useECharts(elRef: Ref<HTMLDivElement>) {
  /**
   * dark、customed 都是echarts的内置主题
   * 详情参考: https://echarts.apache.org/zh/theme-builder.html
   */
  const theme = computed(() =>
    store.appSet.isDarkTheme ? "dark" : "customed"
  );

  // 图表实例
  let chartInstance: echarts.ECharts | null = null;
  // 重置图表大小
  let resizeFn: Fn = resize;
  // 图表配置
  const chartOptions = ref({}) as Ref<EChartsOption>;
  // 移除重置图表大小
  let removeResizeFn: Fn = () => { };

  const getOptions = computed(() => {
    if (theme.value !== "dark") {
      // return chartOptions.value as EChartsOption;
      return {
        backgroundColor: "#fff",
        ...chartOptions.value,
      } as EChartsOption;
    }
    return {
      backgroundColor: "transparent",
      ...chartOptions.value,
    } as EChartsOption;
  });

  // 初始化图表
  function initCharts() {
    /**
     * unref 计算的一个语法糖
     * 如果参数是ref, 则返回内部值, 否则返回参数本身
     * val = isRef(val) ? val.value : val
     */
    const el = unref(elRef);
    if (!el || !unref(el)) return;

    chartInstance = echarts.init(el, theme.value);
    const { removeEvent } = useEventListener({
      el: window,
      name: "resize",
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
    /** 
     * 判断设备类型是否为移动端或者节点高度是否为0
     * clientHeight 它是元素内部的高度
     *    包括padding，但不包括border、margin、水平滚动条（如果存在）
     * offsetHeight 返回元素的可见高度
     *    包括padding、border、水平滚动条（如果存在），但不包括margin
     */
    if (!store.appSet.isPC || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn();
      }, 30)
    }
  }
  /**
   * 这里 options 的类型为Echarts下的
   * 可能要用上 #/echarts 中的类型?
   */
  // 配置选项
  function setOptions(options: EChartsOption, clear = true) {
    chartOptions.value = options;
    // 如果节点高度为0, 则重新获取图表配置
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions))
      }, 30)
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        // 如果图表实例不存在, 则初始化图表
        if (!chartInstance) {
          initCharts();
          // 如果初始化后图表实例还是不存在
          if (!chartInstance) return;
        }
        // 如果 clear 为 true，则清除图表
        clear && chartInstance?.clear();
        // 设置图表的选项
        chartInstance?.setOption(unref(getOptions))
      }, 30)
    })
  }
  // 重置图表大小
  function resize() {
    chartInstance?.resize();
  }

  // 根据主题切换图表的主题
  const themeWatch = watch(() => theme.value, (newTheme) => {
    if (chartInstance) {
      chartInstance.dispose();
      initCharts();
      setOptions(chartOptions.value);
    }
  })
  /** 
   * ! pc端下收缩侧边栏时, 图表宽度不会自适应
   */
  const collapseWatch = watch([() => store.appSet.isCollapse, () => store.appSet.isPC], (newVals, oldVals) => {
    // console.log("🚀 ~ useECharts ~ newVals:", newVals)
    const [_collapse, isPC] = newVals;
    const [__collapse, _isPC] = oldVals;
    /** 
     * 通过f12主动切换设备类型时, 会触发该事件
     * 因为移动端图表的配置和pc端不一样
     * 所以需要重新初始化图表
     */
    if (isPC !== _isPC && chartInstance) {
      chartInstance.dispose();
      initCharts();
      setOptions(chartOptions.value);
      return;
    }
    /** 
     * 通过收缩侧边栏,图表自适应宽度
     */
    if (isPC && chartInstance) {
      useTimeoutFn(() => {
        resizeFn();
      }, 300)
    }
  });

  /** 
   * 如果onUnmounted（）在组件生命周期内
   * 则调用它，否则什么都不做
   */
  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
    themeWatch();
    collapseWatch();
  });

  // 获取图表实例
  function getInstance(): echarts.ECharts | null {
    !chartInstance && initCharts();
    return chartInstance;
  }

  return {
    getInstance,
    setOptions,
    resize,
    echarts,
  };
}
