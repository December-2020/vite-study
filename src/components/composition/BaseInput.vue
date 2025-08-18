<template>
  <component
    :is="h(ElInput, { ...props, onKeydown }, $slots)"
    v-model="model"
    @clear="emit('clear')"
    @blur="emit('blur')"
    @focus="emit('focus')"
    class="base-input"
    ref="inputRef"
  />
</template>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from "vue";
import type { InputProps } from "element-plus";

// ts中使用i18n
import i18n from "@/locales";
import { h } from "vue";
/**
 * * 使用这种方式引入组件
 * * 需要额外引入css
 */
import { ElInput } from "element-plus";
import "element-plus/theme-chalk/el-input.css";

// h(ElInput, $attrs, $slots)
/**
 * * h 函数的3个参数详解
 * * 第一个参数既可以是一个字符串 (用于原生元素) 也可以是一个 Vue 组件定义。
 * * 第二个参数是要传递的 prop，
 * * 第三个参数是子节点。
 */
interface Props extends ExtractPublicPropTypes<InputProps> {
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
  // 自定义组件宽度
  width?: number | string;
  // 阻止输入框的键盘事件
  preventKeyboardEvent?: boolean;
}

/**
 * * defineProps不能引用setup内的变量。
 * * const { t } = useI18n(); 这里的t也是属于变量
 * * 所以不能直接 placeholder: t("xxx")
 */
const props = withDefaults(defineProps<Props>(), {
  placeholder: i18n.global.t(`Components.inputPlaceholder`),
  size: "default",
  resize: "none",
  width: 198,
  preventKeyboardEvent: false,
});
const emit = defineEmits(["focus", "blur", "clear", "keydown"]);

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

/**
 * 键盘事件
 */
const onKeydown = (e: any) => {
  const keyList = ["ArrowUp", "ArrowDown"];
  if (props.preventKeyboardEvent && keyList.includes(e.key)) {
    e.preventDefault();
    emit("keydown", e);
  }
};

/**
 * 获取子组件的 ref
 * * 必须通过defineExpose 暴露子组件
 * * 才能在父组件中通过ref调用
 */
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
