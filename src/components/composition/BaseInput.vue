<!--
 * @Author: Komorebi
 * @Date: 2024-09-26 11:28:51
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-08-22 17:00:19
-->
<template>
  <ElInput
    v-bind="{ ...props, ...$attrs }"
    v-model="model"
    ref="inputRef"
    class="base-input"
    v-slots="$slots"
  />
  <!-- @keydown="onKeydown" -->
</template>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from "vue";
import type {
  InputProps as ElInputProps,
  InputInstance as ElInputInstance,
} from "element-plus";
// ts中使用i18n
import i18n from "@/locales";

interface InputProps extends ExtractPublicPropTypes<ElInputProps> {
  // 自定义组件宽度
  width?: number | string;
  // 阻止输入框的键盘事件
  preventKeyboardEvent?: boolean;
  // 键盘事件
  keyboardList?: KeyboardEvent["key"][];
}

/**
 * * defineProps不能引用setup内的变量。
 * * const { t } = useI18n(); 这里的t也是属于变量
 * * 所以不能直接 placeholder: t("xxx")
 */
const props = withDefaults(defineProps<InputProps>(), {
  placeholder: i18n.global.t(`Components.inputPlaceholder`),
  width: 198,
  preventKeyboardEvent: false,
  keyboardList: () => [],
});
// 声明 emit 类型
const emit = defineEmits<{
  (e: "keydown", event: KeyboardEvent): void;
  // 可补充其他事件，如输入变化等
}>();

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
      return value.replace(/\D/g, "");
    }
    // decimal 小数
    if (modifiers.decimal) {
      // 清除数字和小数点和负号以外的字符
      let val = value.replace(/[^\d.-]/g, "");
      // 只保留第一个负号
      val = val
        .replace(/^-/, "$#$") // 仅以负号开头,才用 "$#$" 进行代替
        .replace(/-/g, "") // 清除其他负号
        .replace("$#$", "-"); // 换回来
      // 不能以小数点开头
      // value = value.replace(/^\./, "");
      // // 只保留第一个小数点
      // value = value
      //   .replace(".", "$#$") // 第一个小数点以 "$#$" 进行代替
      //   .replace(/\./g, "") // 清除其他小数点
      //   .replace("$#$", "."); // 换回来
      // return value;
      // 限制小数点只能有一个，且不能在开头（除非前面有负号）
      val = val.replace(/^\./, "").replace(/(\.\d*)\./g, "$1");
      // 移除末尾多余的小数点（如 "123." → "123"）
      return val.replace(/\.$/, "");
    }
    return value;
  },
});

/**
 * 获取子组件的 ref
 * * 必须通过defineExpose 暴露子组件
 * * 才能在父组件中通过ref调用
 */
const inputRef = ref<ElInputInstance | null>(null);
</script>

<style scoped lang="scss"></style>
