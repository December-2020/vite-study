/*
 * @Author: Komorebi
 * @Date: 2025-01-21 16:55:56
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-22 17:18:52
 */
/**
 * 实现登录页面的背景动画
 * 动态背景并跟随鼠标移动, 且具有吸附鼠标的效果
 */
/**
 * 需要做什么?
 * 1. 跟随频幕大小变化
 * 2. 页面销毁时销毁
 */
import type { Ref } from "vue";

import store from "@/store";
import { ThemeEnum } from "@/enums/app";
import { tryOnMounted, tryOnUnmounted, useTimeoutFn } from "@vueuse/core";
// import { useEventListener } from "@/hooks/useEventListener";

interface CanvasOptions {
  // elRef?: Ref<HTMLCanvasElement>;
  // 画布宽高
  width?: number;
  height?: number;
  // 点的个数
  dotNum?: number;
  // 圆点半径
  dotRadius?: number;
  // 线条及圆点颜色
  color?: string;
  // 背景颜色
  bgColor?: string;
  // 触发连线距离
  distance?: number;
}
interface IDot {
  x: number;
  y: number;
  ax: number;
  ay: number;
}

// 定制明暗主题
const Theme = {
  [ThemeEnum.DARK]: {
    bgColor: "#1b1b1f",
    fontColor: "#dfdfd6",
  },
  [ThemeEnum.LIGHT]: {
    bgColor: "#eee",
    fontColor: "#3c3c43",
  },
};

/**
 * 配置:
 *  画布节点, 宽, 高,
 *  点的个数, 圆点半径
 *  粒子线颜色, 触发连线的距离
 * 开始动画:通过定时器循环执行动画效果
 * 暂停动画:销毁定时器以停止
 * 重置动画:context.clearRect(x, y, width, height)
 */
export function useLineAnimate(elRef: Ref<HTMLCanvasElement | null>) {
  const theme = computed(() => {
    let _type = store.appSet.isDarkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    return Theme[_type];
  });

  let timer: number | undefined;
  let canvasCtx = ref(null) as Ref<CanvasRenderingContext2D | null>;
  let canvasOptions = ref({}) as Ref<CanvasOptions>;
  // let removeResizeFn: Fn = () => {};
  // 关键帧动画, 控制canvas的动画效果
  const rqeAnimateFrame = window.requestAnimationFrame;
  // canvas中的点列表
  let dotList: IDot[] = [];

  // 配置选项
  function setOptions(options: CanvasOptions) {
    // 初始配置
    let _options: CanvasOptions = {
      // 画布宽高
      width: 0,
      height: 0,
      // 点的个数
      dotNum: 100,
      // 点半径
      dotRadius: 0.5,
      // 颜色
      color: theme.value.fontColor,
      // 背景颜色
      bgColor: theme.value.bgColor,
      distance: 100,
      ...options,
    };
    canvasOptions.value = _options;
    if (elRef.value) {
      elRef.value.width = _options.width as number;
      elRef.value.height = _options.height as number;
    }
  }
  // 初始化画布
  function initCanvas() {
    const el = unref(elRef);
    if (!el || !unref(el)) return;

    canvasCtx.value = el.getContext("2d");
    console.log("🚀 ~ initCanvas ~ canvasCtx:", canvasCtx);
  }
  // 清空画布
  function clearCanvas() {
    let _width = canvasOptions.value.width ?? 0;
    let _height = canvasOptions.value.height ?? 0;
    canvasCtx.value?.clearRect(0, 0, _width, _height);
  }

  // 开始动画
  function startAnimate() {
    addDots();
  }0
  // 暂停动画
  function stopAnimate() {
    timer && clearTimeout(timer);
  }
  // 动画效果
  function animate() {
    clearCanvas();
    rqeAnimateFrame(animate);
  }

  // 新增点
  function addDots() {
    let dot: IDot;
    let num = canvasOptions.value.dotNum ?? 0;
    let _width = canvasOptions.value.width ?? 0;
    let _height = canvasOptions.value.height ?? 0;
    let _radius = canvasOptions.value.dotRadius ?? 0;
    for (let i = 0; i < num; i++) {
      dot = {
        x: Math.floor(Math.random() * _width) - _radius,
        y: Math.floor(Math.random() * _height) - _radius,
        ax: (Math.random() * 2 - 1) / 1.5,
        ay: (Math.random() * 2 - 1) / 1.5,
      };
      dotList.push(dot);
    }
  }

  /* 生命周期 */
  tryOnMounted(() => {
    initCanvas();
    startAnimate();
  });
  tryOnUnmounted(() => {
    stopAnimate();
    canvasCtx.value = null;
  });

  return {
    setOptions,
  };
}
