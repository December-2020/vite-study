/*
 * @Author: Komorebi
 * @Date: 2025-01-21 16:55:56
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-19 17:20:57
 */
/**
 * 实现登录页面的背景动画
 * 动态背景并跟随鼠标移动, 且具有吸附鼠标的效果
 */
import type { Ref } from "vue";

import store from "@/store";
import { ThemeEnum } from "@/enums/app";
import { tryOnMounted, tryOnUnmounted, useTimeoutFn } from "@vueuse/core";
import { useEventListener } from "@/hooks/useEventListener";

interface CanvasOptions {
  // 画布宽高
  width?: number;
  height?: number;
  // 点数量
  dotNum?: number;
  // 圆点半径
  dotRadius?: number;
  // 线条及圆点颜色
  color?: string;
  // 连线最大距离
  distance?: number;
  adsorbConfig?: {
    triggerRatio: number; // 吸附触发比例（距离占maxDistance的比例）
    speedRatio: number; // 吸附速度系数（越小越快）
  };
}
interface IDot {
  x: number | null;
  y: number | null;
  ax?: number; // x轴加速度
  ay?: number; // y轴加速度
  isMouse?: boolean; // 是否为鼠标点
}

// 定制明暗主题
const Theme = {
  [ThemeEnum.DARK]: { fontColor: "#dfdfd6" },
  [ThemeEnum.LIGHT]: { fontColor: "#3c3c43" },
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
  // 当前主题
  const theme = computed(() => {
    let _type = store.appSet.isDarkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    return Theme[_type];
  });
  // 当前是否为pc端
  const isPC = computed(() => store.appSet.isPC);

  // 画布上下文
  let canvasCtx = ref(null) as Ref<CanvasRenderingContext2D | null>;
  let canvasOptions = ref({}) as Ref<CanvasOptions>;
  // 关键帧动画, 控制canvas的动画效果
  let rqeAnimateFrameId: number;
  // canvas中的点列表
  const dotList = ref<IDot[]>([]);
  // canvas中鼠标坐标
  const mouseDot = ref<IDot>({ x: null, y: null, isMouse: true });
  // 清除函数列表
  const cleanupList = ref<(() => void)[]>([]);

  // 通用配置
  const commonOptions = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    // 描点的个数
    let dotNum = isPC.value ? 50 : 30;
    // 描点相连的最大距离
    let distance = isPC.value ? 100 : 60;
    return {
      width,
      height,
      dotNum,
      distance,
      adsorbConfig: {
        triggerRatio: 0.5, // 距离超过maxDistance的30%即触发吸附
        speedRatio: 40, // 吸附速度（原50，数值越小越快）
      },
    };
  };
  // 初始化配置
  const mergeOptions = (userOptions?: CanvasOptions) => {
    let defOptions = commonOptions();
    // 初始配置
    let _options: CanvasOptions = {
      ...defOptions,
      // 点半径 0.5
      dotRadius: 2,
      // 颜色
      color: theme.value.fontColor,
      ...userOptions,
    };
    canvasOptions.value = _options;
  };
  // 初始化画布
  const initCanvas = () => {
    const el = unref(elRef);
    if (!el || !unref(el)) return;

    // 获取画布上下文
    const ctx = el.getContext("2d");
    if (!ctx) {
      console.warn("Canvas 2D上下文获取失败，可能不支持该浏览器");
      return;
    }
    canvasCtx.value = ctx;

    // 设置画布尺寸
    const { width, height } = canvasOptions.value;
    el.width = width as number;
    el.height = height as number;

    // 初始化例子
    initDots();
  };
  // 清空画布
  const clearCanvas = () => {
    const el = unref(elRef);
    if (!el || !canvasCtx.value) return;
    canvasCtx.value.clearRect(0, 0, el.width, el.height);
  };
  // 重置画布大小
  const resizeCanvas = () => {
    mergeOptions();
    initCanvas();
    stopAnimate();
    startAnimate();
  };

  // 初始化粒子（避开登录盒子区域）
  const initDots = () => {
    dotList.value = [];
    const { width, height, dotNum } = canvasOptions.value;
    const { leftTop, rightBottom } = getDotRange(width!, height!);

    // 确保生成足够数量的粒子（避免死循环，最多尝试500次）
    let tryCount = 0;
    while (dotList.value.length < dotNum! && tryCount < 500) {
      tryCount++;
      // 随机生成粒子位置
      const x = Math.random() * width!;
      const y = Math.random() * height!;
      /**
       * 界面是 "回" 字形
       * 限制点的范围
       */
      if (
        x < leftTop.x ||
        x > rightBottom.x ||
        y < leftTop.y ||
        y > rightBottom.y
      ) {
        dotList.value.push({
          x,
          y,
          ax: (Math.random() * 2 - 1) / 1.5, // 随机x轴加速度（-0.67~0.67）
          ay: (Math.random() * 2 - 1) / 1.5, // 随机y轴加速度
        });
      }
    }
  };
  /**
   * 登录盒子
   * pc端:
   *    宽400 + 2(边框) = 402
   *    高270 + 2(边框) = 272
   * 移动端:
   *    宽 100vw - 20px(左右各10px的margin)
   *    高 同pc端
   */
  // 点坐标的范围
  const getDotRange = (canvasWidth: number, canvasHeight: number) => {
    // 登录盒子
    let boxWidth = isPC.value ? 402 : canvasWidth - 10 * 2;
    let boxHeight = 272;
    /* 登录盒子最左上角的坐标 */
    let leftTopX = (canvasWidth - boxWidth) / 2;
    let leftTopY = (canvasHeight - boxHeight) / 2;
    /* 登录盒子最右下角的坐标 */
    let rightBottomX = leftTopX + boxWidth;
    let rightBottomY = leftTopY + boxHeight;
    return {
      leftTop: { x: leftTopX, y: leftTopY },
      rightBottom: { x: rightBottomX, y: rightBottomY },
    };
  };
  // 粒子移动（边缘反弹 + 鼠标吸附）
  const dotMove = (dot: IDot) => {
    const {
      width,
      height,
      dotRadius,
      adsorbConfig,
      distance: maxDistance,
    } = canvasOptions.value;
    const { triggerRatio, speedRatio } = adsorbConfig!;
    const { leftTop, rightBottom } = getDotRange(width!, height!);
    const { x: mouseX, y: mouseY } = mouseDot.value;
    // let { x: dotX, y: dotY, ax: dotAx, ay: dotAy } = dot;
    // console.log("🚀 ~ dotMove ~ dot:", dot)

    // 1. 鼠标吸附逻辑（距离超过maxDistance*triggerRatio时触发）
    /* const dx = dot.x! - mouseX!;
    const dy = dot.y! - mouseY!;
    // 两点间距离
    const dotMouseDistance = Math.sqrt(dx * dx + dy * dy);
    if (dotMouseDistance > maxDistance! * triggerRatio) {
      // 粒子向鼠标方向移动
      dot.x! -= dx / speedRatio!;
      dot.y! -= dy / speedRatio!;
    } */

    // 2. 边缘反弹逻辑
    /* 
    || // 最小边界
      (leftTop.x < dot.x! && dot.x! < rightBottom.x) // 登录框区域
    */
    if (
      dot.x! > width! - dotRadius! || // 最大边界
      dot.x! < dotRadius!
    ) {
      dot.ax! *= -1;
    }
    /* 
    || // 最小边界
      (leftTop.y < dot.y! && dot.y! < rightBottom.y) // 登录框区域
    */
    if (
      dot.y! > height! - dotRadius! || // 最大边界
      dot.y! < dotRadius!
    ) {
      dot.ay! *= -1;
    }
    if (
      leftTop.x < dot.x! &&
      dot.x! < rightBottom.x &&
      leftTop.y < dot.y! &&
      dot.y! < rightBottom.y
    ) {
      dot.ax! *= -1;
      dot.ay! *= -1;
    }

    // 更新粒子位置
    dot.x! += dot.ax!;
    dot.y! += dot.ay!;
  };
  // 点之间画线 dots: IDot[]
  const drawElements = () => {
    const { color, dotRadius, distance: maxDistance } = canvasOptions.value;
    const ctx = canvasCtx.value;
    if (!ctx) return;

    const allDotList = [...dotList.value, mouseDot.value];
    // 绘制粒子
    allDotList.forEach((dot) => {
      // 鼠标点不绘制，只作为吸附目标
      if (dot.isMouse) return;
      // 绘制点
      ctx.beginPath();
      ctx.fillStyle = color!;
      ctx.arc(dot.x!, dot.y!, dotRadius!, 0, Math.PI * 2);
      ctx.fill();
    });
    // 2. 绘制连线
    /* dotList.value.forEach((dot, index) => {
      // 只比较粒子与其他点
      for (let i = index + 1; i < allDotList.length; i++) {
        const targetDot = allDotList[i];
        // 鼠标移动到画布外时不连线
        if (targetDot.x === null || targetDot.y === null) continue;
        const dx = dot.x! - targetDot.x!;
        const dy = dot.y! - targetDot.y!;
        const dotDistance = Math.sqrt(dx * dx + dy * dy);
        // 超过最大距离不连线
        if (dotDistance > maxDistance!) continue;
        // 连线透明度/宽度：距离越近，越粗越明显
        const opacity = (maxDistance! - dotDistance) / maxDistance!;
        const lineWidth = opacity / 2;
        // 绘制线
        ctx.beginPath();
        ctx.strokeStyle = `${color!.replace(
          /[^,]+(?=\))/,
          opacity.toFixed(2)
        )}`;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(dot.x!, dot.y!);
        ctx.lineTo(targetDot.x!, targetDot.y!);
        ctx.stroke();
      }
    }); */
  };

  // 动画主循环
  const animate = () => {
    clearCanvas();
    // 更新所有粒子位置
    dotList.value.forEach((dot) => dotMove(dot));
    // 绘制粒子和连线
    drawElements();
    // 继续下一帧
    rqeAnimateFrameId = window.requestAnimationFrame(animate);
  };
  // 开始动画
  const startAnimate = () => {
    // 确保画布初始化完成
    nextTick(() => {
      stopAnimate(); // 先停止旧动画
      animate(); // 启动新动画
    });
  };
  // 停止动画
  const stopAnimate = () => {
    rqeAnimateFrameId && window.cancelAnimationFrame(rqeAnimateFrameId);
  };

  // 初始化鼠标事件
  const initMouseEvents = () => {
    const el = unref(elRef);
    if (!el) return;

    // 鼠标移动：更新鼠标点位置
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseDot.value.x = e.clientX - rect.left;
      mouseDot.value.y = e.clientY - rect.top;
    };
    // 鼠标离开：鼠标点移到屏幕外
    const handleMouseOut = () => {
      mouseDot.value.x = null;
      mouseDot.value.y = null;
    };

    const { removeEvent: removeMouseMove } = useEventListener({
      el,
      name: "mousemove",
      listener: handleMouseMove,
      isDebounce: false,
      wait: 100,
    });
    cleanupList.value.push(removeMouseMove);
    const { removeEvent: removeMouseOut } = useEventListener({
      el,
      name: "mouseout",
      listener: handleMouseOut,
      isDebounce: false,
      wait: 100,
    });
    cleanupList.value.push(removeMouseOut);
  };

  // 主题切换
  const themeWatch = watch(
    () => theme.value,
    (newTheme) => {
      mergeOptions({ color: newTheme.fontColor });
      startAnimate(); // 重启动画应用新颜色
    }
  );

  /* 生命周期 */
  tryOnMounted(() => {
    mergeOptions(); // 初始化配置
    initCanvas(); // 初始化画布
    initMouseEvents(); // 初始化鼠标事件
    startAnimate(); // 启动动画

    // 监听Resize事件
    const { removeEvent } = useEventListener({
      el: window,
      name: "resize",
      listener: resizeCanvas,
      wait: 100,
    });
    cleanupList.value.push(removeEvent);
  });
  tryOnUnmounted(() => {
    stopAnimate();
    // 清理所有事件
    cleanupList.value.forEach((cleanup) => cleanup());
    // 停止主题监听
    themeWatch();
    // 清空状态
    dotList.value = [];
    canvasCtx.value = null;
  });

  const setOptions = (userOptions: CanvasOptions) => {
    mergeOptions(userOptions);
    initCanvas();
    stopAnimate();
    startAnimate();
  };

  return { setOptions };
}
