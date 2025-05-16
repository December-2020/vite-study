<!--
 * @Author: Komorebi
 * @Date: 2025-05-09 15:34:33
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-05-16 13:51:02
-->
<template>
  <div class="editor">
    <textarea :id="tinymceId" ref="elRef" />
  </div>
</template>

<!-- 菜单栏 工具栏 内容栏 共同组合成一个富文本 -->

<script setup lang="ts">
import type { Editor, RawEditorOptions } from "tinymce";

import tinymce from "tinymce/tinymce";
import { buildShortUUID } from "@/utils/uuid";
import { plugins as defaultPlugins, toolbar as defaultToolbar } from "./config";

/**
 * tinymce插件可按需导入
 * @see https://www.tiny.cloud/docs/tinymce/latest/plugins/#open-source-plugins
 * import 'tinymce/plugins/advlist';
 */

const props = defineProps({
  options: {
    type: Object as PropType<Partial<RawEditorOptions>>,
    default: () => ({}),
  },
  toolbar: {
    type: Array as PropType<string[]>,
    default: defaultToolbar,
  },
  plugins: {
    type: Array as PropType<string[]>,
    default: defaultPlugins,
  },
  height: {
    type: [Number, String] as PropType<string | number>,
    // required: false,
    default: 400,
  },
  width: {
    type: [Number, String] as PropType<string | number>,
    // required: false,
    default: "auto",
  },
});

/** 
 * 仅在 3.4+ 中可用
 * 声明 "modelValue" prop，由父组件通过 v-model 使用
 */
const model = defineModel();
const emit = defineEmits(["change"]);

const tinymceId = ref<string>(buildShortUUID("tiny-vue"));
// textarea的ref
const elRef = ref<HTMLElement | null>(null);
const editorRef = ref<Editor | null>(null);
</script>

<style scoped lang="scss"></style>
