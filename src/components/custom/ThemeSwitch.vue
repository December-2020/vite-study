<!--
 * @Author: Komorebi
 * @Date: 2024-10-08 16:42:53
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-25 09:55:19
-->
<template>
  <BaseSwitch
    :modelValue="isDark"
    @click="toggleTheme"
    class="theme-switch"
    :active-value="true"
    :inactive-value="false"
    inline-prompt
    :active-icon="Sun"
    :inactive-icon="Moon"
    ref="themeRef"
  ></BaseSwitch>
</template>

<script setup lang="ts">
import {
  useDark,
  useToggle,
  useMouseInElement,
  useAnimate,
} from "@vueuse/core";
import Sun from "@/components/once/SvgSun.vue";
import Moon from "@/components/once/SvgMoon.vue";

/**
 * *在没有该组件的页面刷新, 会丢失主题
 * element-plus的暗黑模式是通过在
 * html的class中添加dark来实现的
 *
 * vueuse-color-scheme
 * 如果值是 auto 则处于暗黑模式下
 * 如果是 light 则处白天模式
 */
const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
});

const themeRef = ref();
// 获取鼠标的坐标
const { x, y } = useMouseInElement(themeRef);

const toggleTheme = () => {
  // 获取到 transition API 实例
  const transition = document.startViewTransition(() => {
    // 传递参数并执行该函数
    useToggle(isDark)();
  });

  // 在 transition.ready 的 Promise 完成后，执行自定义动画
  transition.ready.then(() => {
    // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
    const radius = Math.hypot(
      Math.max(x.value, innerWidth - x.value),
      Math.max(y.value, innerHeight - y.value)
    );

    const _clipPath = [
      `circle(0% at ${x.value}px ${y.value}px)`,
      `circle(${radius}px at ${x.value}px ${y.value}px)`,
    ];
    const clipPath = isDark.value ? _clipPath.reverse() : _clipPath;
    // 如果要切换到暗色主题, 应该裁剪old的内容
    let pseudoElement = `::view-transition-${
      isDark.value ? "old" : "new"
    }(root)`;

    // 自定义动画
    useAnimate(
      document.documentElement,
      { clipPath },
      { pseudoElement, duration: 500 }
    );
  });
};
</script>

<style scoped lang="scss">
::view-transition-new(root),
::view-transition-old(root) {
  /* 关闭默认动画，否则影响自定义动画的执行 */
  animation: none;
}
html[class="dark"] {
  &::view-transition-old(root) {
    z-index: 100 !important;
  }
}
.theme-switch {
  /**
   * *element plus 修改颜色变量 
   */
  --el-switch-on-color: #eee;
  --el-switch-off-color: #303133;
  // --el-switch-border-color: #fafafa;
}
</style>
