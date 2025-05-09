<!--
 * @Author: Komorebi
 * @Date: 2025-05-09 15:34:33
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-05-09 16:27:17
-->
<template>
  <div class="editor">
    <textarea :id="tinymceId" ref="elRef" />
  </div>
</template>

<!-- 菜单栏 工具栏 内容栏 共同组合成一个富文本 -->

<script setup lang="ts">
import type { Editor, RawEditorSettings } from 'tinymce';

import tinymce from 'tinymce/tinymce';
import { buildShortUUID } from "@/utils/uuid";

const props = defineProps({

})
const emit = defineEmits([]);

const tinymceId = ref<string>(buildShortUUID("tiny-vue"));
const elRef = ref<HTMLElement | null>(null);
</script>

<style scoped lang="scss"></style>
