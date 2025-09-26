/*
 * @Author: Komorebi
 * @Date: 2025-01-21 16:55:56
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-26 10:34:34
 */
/**
 * 实现登录页面的背景动画
 * 动态背景并跟随鼠标移动, 且具有吸附鼠标的效果
 *
 * # TODO：标记代码中需要实现的功能或任务。
 * # FIXME：标记代码中需要修复的问题或缺陷。
 * # BUG：标记已知的Bug或错误。
 * # XXX：标记需要警惕或需要重点关注的代码块。
 * # HACK：标记临时性修复或不优雅的解决方案。
 */
import type { Ref } from "vue";

import store from "@/store";
import { ThemeEnum } from "@/enums/app";
import { tryOnMounted, tryOnUnmounted } from "@vueuse/core";
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
  // const isPC = computed(() => store.appSet.isPC);

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
    return {
      width,
      height,
      dotNum: 10,
      distance: 10,
      // 点半径
      dotRadius: 1,
      // 颜色
      color: theme.value.fontColor,
      adsorbConfig: {
        triggerRatio: 0.5, // 距离超过maxDistance的50%即触发吸附
        speedRatio: 80, // 吸附速度（原50，数值越小越快）
      },
    };
  };
  // 初始化配置
  const mergeOptions = (userOptions?: CanvasOptions) => {
    let defOptions = commonOptions();
    let { width, height } = defOptions;
    /* console.log(
      "🚀 ~ mergeOptions ~ canvasOptions.value:",
      canvasOptions.value
    ); */
    // 初始配置
    let _options: CanvasOptions = {
      ...defOptions,
      // 若已有配置，则保留已有配置
      ...canvasOptions.value,
      // 确保是最新的
      width,
      height,
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
    // console.log("🚀 ~ resizeCanvas ~ resizeCanvas: 执行了mergeOptions");
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
       * 粒子应该在回字形区域外生成（避开登录盒子区域）
       */
      const isInLoginBox =
        x >= leftTop.x &&
        x <= rightBottom.x &&
        y >= leftTop.y &&
        y <= rightBottom.y;
      if (!isInLoginBox) {
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
    let boxWidth = store.appSet.isPC ? 402 : canvasWidth - 10 * 2;
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

    // 1. 鼠标吸附逻辑（距离超过maxDistance*triggerRatio时触发）
    if (mouseX !== null && mouseY !== null) {
      const dx = dot.x! - mouseX;
      const dy = dot.y! - mouseY;
      // 两点间距离
      const dotMouseDistance = Math.sqrt(dx * dx + dy * dy);
      if (dotMouseDistance <= maxDistance! * triggerRatio) {
        // 粒子向鼠标方向移动
        dot.x! -= dx / speedRatio!;
        dot.y! -= dy / speedRatio!;
      }
    }

    // 2. 边缘反弹逻辑 检查是否超出画布边界
    if (dot.x! >= width! - dotRadius! || dot.x! <= dotRadius!) {
      dot.ax! *= -1;
    }
    if (dot.y! >= height! - dotRadius! || dot.y! <= dotRadius!) {
      dot.ay! *= -1;
    }

    // 3. 登录盒子区域边界检测
    const isInLoginBox =
      dot.x! >= leftTop.x &&
      dot.x! <= rightBottom.x &&
      dot.y! >= leftTop.y &&
      dot.y! <= rightBottom.y;
    if (isInLoginBox) {
      // 如果粒子在登录盒子内，需要将其推出并反弹
      // 计算粒子到登录盒子各边的距离
      const distToLeft = dot.x! - leftTop.x;
      const distToRight = rightBottom.x - dot.x!;
      const distToTop = dot.y! - leftTop.y;
      const distToBottom = rightBottom.y - dot.y!;

      // 找到最近的边
      const minDist = Math.min(
        distToLeft,
        distToRight,
        distToTop,
        distToBottom
      );

      if (minDist === distToLeft) {
        // 从左边推出
        dot.x! = leftTop.x - dotRadius!;
        dot.ax! = -Math.abs(dot.ax!); // 确保向左移动
      } else if (minDist === distToRight) {
        // 从右边推出
        dot.x! = rightBottom.x + dotRadius!;
        dot.ax! = Math.abs(dot.ax!); // 确保向右移动
      } else if (minDist === distToTop) {
        // 从上面推出
        dot.y! = leftTop.y - dotRadius!;
        dot.ay! = -Math.abs(dot.ay!); // 确保向上移动
      } else if (minDist === distToBottom) {
        // 从下面推出
        dot.y! = rightBottom.y + dotRadius!;
        dot.ay! = Math.abs(dot.ay!); // 确保向下移动
      }
    }

    // 更新粒子位置
    dot.x! += dot.ax!;
    dot.y! += dot.ay!;

    // 5. 最终边界检查，确保粒子不会超出画布
    dot.x! = Math.max(dotRadius!, Math.min(width! - dotRadius!, dot.x!));
    dot.y! = Math.max(dotRadius!, Math.min(height! - dotRadius!, dot.y!));
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
    dotList.value.forEach((dot, index) => {
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
    });
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
      // console.log("🚀 ~ themeWatch ~ themeWatch: 监听后执行了mergeOptions");
      startAnimate(); // 重启动画应用新颜色
    }
  );

  /* 生命周期 */
  tryOnMounted(() => {
    mergeOptions(); // 初始化配置
    // console.log("🚀 ~ tryOnMounted ~ tryOnMounted: 初始化了mergeOptions");
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
    // console.log("🚀 ~ setOptions ~ setOptions: 设置后执行了mergeOptions");
    initCanvas();
    stopAnimate();
    startAnimate();
  };

  return { setOptions };
}
