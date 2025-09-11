<!--
 * @Author: Komorebi
 * @Date: 2024-09-26 11:28:51
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-11 11:18:33
-->
<template>
  <ElInput
    v-bind="mergedProps"
    @keydown="handleKeydown"
    @blur="handleBlur"
    ref="inputRef"
    v-model="model"
  >
    <template v-for="(_, name) in $slots" #[name]="scope" :key="name">
      <slot :name="name" v-bind="scope" />
    </template>
  </ElInput>
</template>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from "vue";
import type {
  InputProps as ElInputProps,
  InputInstance as ElInputInstance,
} from "element-plus";

import { mergeProps } from "vue";
import i18n from "@/locales";

interface InputProps extends ExtractPublicPropTypes<ElInputProps> {
  width?: number | string;
  preventKeyboardEvent?: boolean;
  keyboardList?: KeyboardEvent["key"][];
}
type InputSlots = ElInputInstance["$slots"];

/**
 * * props中使用i18n
 * * defineProps不能引用setup内的变量。
 * * const { t } = useI18n(); 这里的t也是属于变量
 * * 所以不能直接 placeholder: t("xxx")
 */
const props = withDefaults(defineProps<InputProps>(), {
  placeholder: i18n.global.t(`Components.inputPlaceholder`),
  // 自定义组件宽度
  width: 198,
  // 阻止输入框的键盘事件
  preventKeyboardEvent: false,
  // 需要阻止的键盘事件列表
  keyboardList: () => [],
});

const emit = defineEmits(["keydown", "blur"]);
const mergedProps = mergeProps(props, { class: "base-input" });

/**
 * 计算输入框的宽度
 */
const inputWidth = computed(() => {
  const { width } = props;
  if (typeof width === "number") {
    return `${width}px`;
  }
  // 匹配一个由纯数字组成的、非空的字符串
  if (typeof width === "string" && /^\d+$/.test(width)) {
    return `${width}px`;
  }
  // px % rem em 'auto'
  return width;
});

/**
 * 阻止的键盘事件
 */
const handleKeydown = (e: KeyboardEvent | Event) => {
  const { preventKeyboardEvent, keyboardList } = props;
  if (
    e instanceof KeyboardEvent &&
    preventKeyboardEvent &&
    keyboardList.includes(e.key)
  ) {
    e.preventDefault();
    emit("keydown", e);
  }
};

// 正则常量
const REGEX = {
  // 非数字
  nonDigit: /\D/g,
  // 仅有数字和小数点
  nonDecimal: /[^\d.-]/g,
  // 负号开头
  leadingMinus: /^-/,
  // 多个负号
  multipleMinus: /-/g,
  // 小数点开头
  leadingDot: /^\./,
  // 多个小数点
  multipleDot: /(\.\d*)\./g,
  // 小数点结尾
  trailingDot: /\.$/,
};
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
    // decimal 小数
    if (modifiers.decimal) {
      // 清除数字和小数点和负号以外的字符
      let val = value.replace(REGEX.nonDecimal, "");
      // 只保留第一个负号
      val = val
        .replace(REGEX.leadingMinus, "$#$") // 仅以负号开头,才用 "$#$" 进行代替
        .replace(REGEX.multipleMinus, "") // 清除其他负号
        .replace("$#$", "-"); // 换回来

      // 限制小数点只能有一个，且不能在开头（除非前面有负号）
      val = val
        .replace(REGEX.leadingDot, "") // 不能以小数点开头
        .replace(REGEX.multipleDot, "$1"); // 清除其他小数点
      return val;
    }
    return value;
  },
});
// 处理失去焦点时的小数点结尾问题
const handleBlur = (e: FocusEvent) => {
  // 只有当使用decimal修饰符且有值时才处理
  if (modifiers.decimal && model.value) {
    // 清除结尾的小数点
    model.value = model.value.replace(REGEX.trailingDot, "");
  }
  emit("blur", e);
};

/**
 * 获取子组件的 ref
 * * 必须通过defineExpose 暴露子组件
 * * 才能在父组件中通过ref调用
 */
const inputRef = ref<ElInputInstance | null>(null);
defineExpose<ElInputInstance>(
  new Proxy(
    {},
    {
      get: (_target, prop) => inputRef.value?.[prop as keyof ElInputInstance],
      /**
       * v-if 由 true 变为 false 时,
       * 再通过 ref 调用子组件的方法或属性,
       * 此时会报错, 因为子组件已经被销毁了,
       * 所以需要在 has 方法中判断子组件是否存在,
       * 不存在则返回 false, 否则返回 true
       */
      has: (_target, prop) => prop in (inputRef.value || {}),
    }
  ) as ElInputInstance
);
/**
 * 暴露可给父组件使用的插槽
 */
defineSlots<InputSlots>();
</script>

<style scoped lang="scss">
.base-input {
  width: v-bind("inputWidth");
}
</style>
