<!--
 * @Author: Komorebi
 * @Date: 2025-05-09 15:34:33
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-05-15 17:28:33
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

/** 
 * tinymce插件可按需导入
 * @see https://www.tiny.cloud/docs/tinymce/latest/plugins/#open-source-plugins
 * import 'tinymce/plugins/advlist';
 * 
 * Accordion  创建可展开和可折叠的部分
 * Anchor  插入锚点（有时称为书签）
 * Autolink  自动创建超链接
 * Autoresize  自动调整TinyMCE的大小以适应内容
 * Autosave  在本地浏览器中自动保存内容
 * Character Map  在TinyMCE中插入特殊字符
 * Code  编辑内容的HTML源代码
 * Code Sample  插入并嵌入语法突出显示的代码段
 * Directionality  用于设置内容从左到右或从右到左方向的工具栏按钮
 * Emoticons  为您的内容添加一个笑脸
 * Full Screen  全屏显示TinyMCE
 * Help  显示帮助对话框
 * Image  将图像插入TinyMCE
 * Import CSS  自动将CSS类名填充到Format下拉列表中
 * Insert Date/Time  将当前日期和/或时间插入TinyMCE
 * Link  向内容添加超链接
 * Lists  规范浏览器之间的列表行为
 * List Styles  创建样式编号和项目符号列表
 * Media  添加HTML5视频和音频元素
 * Nonbreaking Space  插入一个非换行空格
 * Page Break  添加分页符
 * Preview  以只读格式显示当前内容的对话框
 * Quick Toolbars   用户界面控件可更快地创建内容
 * Save  在TinyMCE工具栏中添加一个保存按钮
 * Search and Replace   查找并替换TinyMCE中的内容
 * Table  表格编辑功能
 * Visual Blocks  允许用户查看块级元素，如段落
 * Visual Characters  请查看不可见字符，如非换行空格
 * Word Count  在TinyMCE状态栏中显示字数
 */
const props = defineProps({
  options: {
    type: Object as PropType<Partial<RawEditorOptions>>,
    default: () => ({}),
  },
});
const emit = defineEmits([]);

const tinymceId = ref<string>(buildShortUUID("tiny-vue"));
const elRef = ref<HTMLElement | null>(null);
</script>

<style scoped lang="scss"></style>
