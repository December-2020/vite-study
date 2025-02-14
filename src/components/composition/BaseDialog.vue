<!--
 * @Author: Komorebi
 * @Date: 2025-02-11 11:10:31
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-14 15:41:43
-->
<template>
  <component
    :is="h(ElDialog, props, $slots)"
    ref="DialogRef"
    @open="emit('open')"
    @opened="emit('opened')"
    @close="emit('close')"
    @closed="emit('closed')"
    @open-auto-focus="emit('open-auto-focus')"
    @close-auto-focus="emit('close-auto-focus')"
  />
</template>

<script setup lang="ts">
import type { DialogProps } from "element-plus";
// import type { Mutable } from "#/global";

import { h } from "vue";
import { ElDialog } from "element-plus";
import "element-plus/theme-chalk/el-dialog.css";

// type Props = Partial<Mutable<DialogProps>>;
// type Props = Partial<DialogProps>;
interface Props extends Partial<DialogProps> {}

const props = withDefaults(defineProps<Props>(), {
  appendToBody: true,
  /**
   * 是否水平垂直对齐对话框
   * 为true时, top属性无效
   */
  alignCenter: true,
  /**
   * 是否在 Dialog 关闭时销毁 Dialog 中的元素
   * 1. 内存泄漏
   *    弹窗内的dom节点、事件监听器、第三方库实例等未被释放，
   *    长期积累会导致内存占用增加，性能下降。
   *    解决方案：v-if代替v-show，生命周期钩子中手动销毁
   * 2. 数据残留
   *    弹窗内的数据未被清空，下次打开弹窗时数据未被重置。
   *    解决方案：手动重置数据
   * 3. 事件监听重复绑定
   *    若弹窗内有事件监听器，关闭时未移除，
   *    每次打开弹窗都会重复绑定事件。
   *    解决方案：在组件卸载时移除事件监听器
   * 4. 定时器未被清除
   *    基本类似第3条
   * 5. 状态管理混乱
   *    可能与其他组件产生冲突
   *    解决方案：在弹窗关闭时调用状态重置方法，或通过订阅弹窗的可见性来重置状态
   * 6. 性能问题
   *    未销毁的组件会继续占用内存，可能会导致页面卡顿
   *    解决方案：使用虚线滚动优化长列表弹窗，确保弹窗内组件按需加载
   */
  destroyOnClose: true,
  // 官方默认
  modal: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
});

const emit = defineEmits([
  "open",
  "opened",
  "close",
  "closed",
  "open-auto-focus",
  "close-auto-focus",
]);

const DialogRef = ref();
defineExpose(
  new Proxy(
    {},
    {
      get(_target, prop) {
        return DialogRef.value?.[prop];
      },
      has(_target, prop) {
        return prop in DialogRef.value;
      },
    }
  )
);
</script>
