<!--
 * @Author: Komorebi
 * @Date: 2024-09-26 11:28:51
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-08-28 17:13:54
-->
<template>
  <ElInput
    v-bind="merged"
    @keydown="handleKeydown"
    ref="inputRef"
  ></ElInput>
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
/**
 *
 */
const emit = defineEmits(["keydown"]);
const merged = mergeProps(props, { class: "base-input" });

/**
 * 计算输入框的宽度
 */
const inputWidth = computed(() => {
  const width = props.width;
  if (typeof width === "number") {
    return `${width}px`;
  }
  if (typeof width === "string") {
    let num = Number(width);
    if (!isNaN(num) && num > 0) {
      return `${width}px`;
    }
    // px % rem em 'auto'
    return width;
  }
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
</script>

<style scoped lang="scss">
.base-input {
  width: v-bind("inputWidth");
  :deep(.el-input__inner) {
    &[type="password"] {
      // letter-spacing: -7px;
    }
  }
}
</style>
