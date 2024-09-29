<template>
  <component
    :is="h(ElInput, props, $slots)"
    v-model="model"
    @clear="emit('clear')"
    @blur="emit('blur')"
    @focus="emit('focus')"
    class="base-input"
    ref="inputRef"
  />
</template>

<script setup lang="ts">
// Component, StyleValue
import type { Component } from "vue";

// ts中使用i18n
import i18n from "@/locales";
import { h } from "vue";
import { ElInput } from "element-plus";

// import { ElInput, inputProps } from "element-plus";

// type Props = typeof inputProps & {
//   width?: number | string;
// };

// h(ElInput, $attrs, $slots)
/**
 * * h 函数的3个参数详解
 * * 第一个参数既可以是一个字符串 (用于原生元素) 也可以是一个 Vue 组件定义。
 * * 第二个参数是要传递的 prop，
 * * 第三个参数是子节点。
 */
interface Props {
  // 修饰符
  //   modelModifiers?: {
  //     lazy?: string;
  //     number?: string;
  //     trim?: string;
  //     // 非负整数
  //     nonnegative?: string;
  //     // 小数
  //     decimal?: string;
  //   };
  // 输入框类型 (原生)
  type?: string;
  maxlength?: number | string;
  minlength?: number;
  /**
   * 是否显示输入字数统计
   * type 需为 text 或 textarea
   * 配合 maxlength 一起使用
   */
  showWordLimit?: boolean;
  placeholder?: string;
  clearable?: boolean;
  // 是否显示切换密码图标
  showPassword?: boolean;
  disabled?: boolean;
  size?: "large" | "default" | "small";
  prefixIcon?: string | Component;
  rows?: number;
  // textarea 高度是否自适应
  autosize?: boolean | object;
  /**
   * 输入字段是否应该启用自动完成功能
   * 表单中输入框填充
   */
  autocomplete?: "on" | "off";
  name?: string;
  // 只读
  readonly?: boolean;
  /**
   * 数值区间
   * min、max、step的类型都是暂定
   * Firefox 不支持 input 标签的 max 和 min 属性
   */
  min?: string | number;
  max?: string | number;
  step?: string | number;
  // 控制是否能被用户缩放
  resize?: "none" | "both" | "horizontal" | "vertical";
  // 自动获取焦点
  autofocus?: boolean;
  label?: string;
  // tabIndex 属性设置或返回元素的 tab 键控制次序。
  tabindex?: string | number;
  // 输入时是否触发表单的校验
  validateEvent?: boolean;
  // inputStyle?: StyleValue;
  // 自定义组件宽度
  width?: number | string;
}

/**
 * * defineProps不能引用setup内的变量。
 * * const { t } = useI18n(); 这里的t也是属于变量
 * * 所以不能直接 placeholder: t("xxx")
 */
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  showWordLimit: false,
  placeholder: i18n.global.t(`Components.inputPlaceholder`),
  clearable: false,
  showPassword: false,
  disabled: false,
  size: "default",
  rows: 2,
  // { minRows: 2, maxRows: 6 }
  autosize: false,
  autocomplete: "off",
  readonly: false,
  resize: "none",
  autofocus: false,
  validateEvent: true,
  width: 198,
});
const emit = defineEmits(["focus", "blur", "clear"]);

/**
 * * Vue3.4以上才能使用 defineModel
 */
const [model, modifiers] = defineModel({
  /**
   * ! 如果为 defineModel prop 设置了一个 default 值
   * ! 且父组件没有为该 prop 提供任何值
   * ! 会导致父组件与子组件之间不同步。
   */
  default: "",
  set(value) {
    // nonnegative 非负整数
    if (modifiers.nonnegative) {
      value = value.replace(/\D/g, "");
      return value;
    }
    // decimal 小数
    if (modifiers.decimal) {
      // 清除数字和小数点和负号以外的字符
      value = value.replace(/[^\d.-]/g, "");
      // 只保留第一个负号
      value = value
        .replace(/^-/, "$#$") // 仅以负号开头,才用 "$#$" 进行代替
        .replace(/-/g, "") // 清除其他负号
        .replace("$#$", "-"); // 换回来
      // 不能以小数点开头
      value = value.replace(/^\./, "");
      // 只保留第一个小数点
      value = value
        .replace(".", "$#$") // 第一个小数点以 "$#$" 进行代替
        .replace(/\./g, "") // 清除其他小数点
        .replace("$#$", "."); // 换回来
      return value;
    }
    return value;
  },
});

// 计算输入框的宽度
const inputWidth = computed(() => {
  const width = props.width;
  if (typeof width === "number") {
    return `${width}px`;
  }
  if (typeof width === "string") {
    // 以 "px" 或 "%" 结尾
    if (width.endsWith("px") || width.endsWith("%")) {
      return width;
    }
    let num = Number(width);
    if (!isNaN(num) && num > 0) {
      return `${width}px`;
    }
  }
});

// 获取子组件的 ref
const inputRef = ref();
defineExpose(
  new Proxy(
    {},
    {
      get(_target, prop) {
        return inputRef.value?.[prop];
      },
      has(_target, prop) {
        return prop in inputRef.value;
      },
    }
  )
);
</script>

<style lang="scss" scoped>
.base-input {
  width: v-bind("inputWidth");
}
</style>
