<!--
 * @Author: Komorebi
 * @Date: 2024-10-10 16:12:47
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-21 09:47:08
-->
<template>
  <el-dropdown
    ref="dropdownRef"
    class="base-dropdown"
    v-bind="props"
    @click="emit('click')"
    @command="emit('command', $event)"
    @visible-change="emit('visible-change', $event)"
  >
    <slot></slot>
    <!-- 是否自定义弹框中内容 -->
    <template #dropdown>
      <slot name="dropdown" v-if="$slots.dropdown"></slot>
      <!-- 默认弹框内容 -->
      <el-dropdown-menu v-else>
        <el-dropdown-item
          v-for="(item, index) in props.options"
          :key="item.key || index"
          :command="item.command"
          :disabled="item.disabled"
          :divided="item.divided"
          :icon="item.icon"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import type {
  ComponentSize,
  ButtonType,
  TooltipTriggerType,
} from "element-plus";

export interface DropdownItemProps {
  command?: string | number | object;
  disabled?: boolean;
  divided?: boolean;
  icon?: string | Component;
  /**
   * 自定义参数
   */
  // 每一项显示的文字
  label?: string;
  // 循环的key
  key?: string | number;
  // 带有任意数量的其它属性
  [propName: string]: any;
}
interface Props {
  type?: ButtonType;
  size?: ComponentSize;
  maxHeight?: string | number;
  splitButton?: boolean;
  disabled?: boolean;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end";
  trigger?: Exclude<TooltipTriggerType, "focus">;
  hideOnClick?: boolean;
  showTimeout?: number;
  hideTimeout?: number;
  role?: string; // "menu" | "navigation”
  tabindex?: number | string;
  popperClass?: string;
  popperOptions?: object;
  teleported?: boolean;
  /**
   * 自定义参数
   */
  options?: DropdownItemProps[];
}

const props = withDefaults(defineProps<Props>(), {
  // 需要传递的默认参数
  hideOnClick: true,
});

const emit = defineEmits(["click", "command", "visible-change"]);

/**
 * 获取子组件的 ref
 * * 必须通过defineExpose 暴露子组件
 * * 才能在父组件中通过ref调用
 */
const dropdownRef = ref();
defineExpose(
  new Proxy(
    {},
    {
      get(_target, prop) {
        return dropdownRef.value?.[prop];
      },
      has(_target, prop) {
        return prop in dropdownRef.value;
      },
    }
  )
);
</script>
