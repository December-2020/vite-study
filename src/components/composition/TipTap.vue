<template>
  <div class="tiptap-wrap">
    <!-- 文字命令行 -->
    <div class="command-text">文件 编辑 插入 视图 格式</div>
    <!-- 工具栏 -->
    <div class="tool-icon">字体大小</div>
    <!-- 编辑器 -->
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
/**
 * StarterKit 包含以下扩展：
 * - 标题、正文、加粗、斜体、有序列表、无序列表、撤销、恢复等
 * 其他功能需额外引入扩展
 */

const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [StarterKit],
});
</script>

<style scoped lang="scss">

</style>
