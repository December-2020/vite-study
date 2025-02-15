<!--
 * @Author: Komorebi
 * @Date: 2024-09-29 16:29:45
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-15 14:38:27
-->
<template>
  <component
    :is="h(ElButton, props, $slots)"
    v-prevent-reclick="props.isPreventReclick"
  />
</template>

<script setup lang="ts">
import type { ButtonProps } from "element-plus";
import type { DirectiveBinding, ObjectDirective } from "vue";

import { h } from "vue";
import { ElButton } from "element-plus";
import "element-plus/theme-chalk/el-button.css";

interface Props extends Partial<ButtonProps> {
  isPreventReclick?: boolean;
  reClickTime?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: "primary",
  /**
   * 是否阻止重复点击
   * 网络波动时，可能会出现重复提交的情况
   */
  isPreventReclick: false,
  // 重复点击的时间间隔(秒)
  // reClickTime: 2,
});

// 使用 WeakMap 来存储元素和定时器的映射，避免内存泄漏
const timerMap = new WeakMap<HTMLButtonElement, number>();
// https://cn.vuejs.org/guide/reusability/custom-directives.html#custom-directives
// 必须以这种方式命名自定义指令, 以使得可以直接在模板中使用
const vPreventReclick: ObjectDirective<HTMLButtonElement> = {
  // 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
  mounted(el: HTMLButtonElement, binding: DirectiveBinding) {
    if (binding.value) {
      el.addEventListener("click", (e: Event) => {
        let { reClickTime } = props;
        const delay = reClickTime && reClickTime > 0 ? reClickTime : 2;
        if (el.disabled) {
          /**
           * stopPropagation
           *  阻止捕获和冒泡阶段中当前事件的进一步传播。
           * stopImmediatePropagation
           *  更进一步阻止调用相同事件的侦听器。
           */
          e.stopImmediatePropagation();
          e.preventDefault();
          return;
        }
        // 禁用按钮
        el.disabled = true;
        el.classList.add("is-disabled");
        // 清除旧定时器(如果存在)
        const existingTimer = timerMap.get(el);
        if (existingTimer) clearTimeout(existingTimer);
        // 设置新定时器
        const timer = setTimeout(() => {
          el.disabled = false;
          el.classList.remove("is-disabled");
          timerMap.delete(el);
        }, delay * 1000);
        // 将定时器存储到 WeakMap 中
        timerMap.set(el, timer);
      });
    }
  },
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el: HTMLButtonElement, binding: DirectiveBinding) {
    if (binding.value) {
      // 组件卸载时清除定时器
      const timer = timerMap.get(el);
      if (timer) {
        clearTimeout(timer);
        timerMap.delete(el);
      }
    }
  },
};
</script>
