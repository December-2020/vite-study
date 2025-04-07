<!--
 * @Author: Komorebi
 * @Date: 2025-03-28 11:17:22
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-04-07 17:25:37
-->
<template>
  <div class="tiptap-wrap">
    <!-- 文字命令行 -->
    <div class="command-text">文件 编辑 插入 视图 格式</div>
    <!-- 工具栏 -->
    <div class="tool-icon flex">
      <div
        v-for="item in IconList"
        :key="item"
        :class="['tool-icon_item', { active: activeIcon(item) }]"
        @click="toggleIcon(item)"
      >
        <SvgIcon :icon-class="`richtext-${item}`" />
      </div>
    </div>
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
  editorProps: {
    attributes: {
      class: "tiptap-editor",
    },
  },
});

/* 第一行icon */
const IconList = [
  "bold",
  "italic",
  "font_underline",
  "font_strikethrough",
  "align_left",
  "align_center",
  "align_right",
];
/** 
 * bold => toggleBold
 * italic => toggleItalic
 * font_underline => toggleUnderline
 * font_strikethrough => toggleStrikethrough
 * align_left => setTextAlign("left")
 * align_center => setTextAlign("center")
 * align_right => setTextAlign("right")
 */
const iconKeyList = ref<string[]>([]);
const activeIcon = computed(() => {
  return (key: string) => unref(iconKeyList).includes(key);
});
const toggleIcon = (key: string) => {
  // 如果不存在, 则添加, 否则移除
  let index = iconKeyList.value.indexOf(key);
  if (index !== -1) {
    iconKeyList.value.splice(index, 1);
  } else {
    // 对齐方式只能有一种
    if (key.startsWith("align")) {
      iconKeyList.value = iconKeyList.value.filter(
        (item) => !item.startsWith("align")
      );
    }
    // 添加新的
    iconKeyList.value.push(key);
  }
};
</script>

<style scoped lang="scss">
.tiptap-wrap {
  .tool-icon {
    &_item {
      cursor: pointer;
      padding: 5px;
      border: 1px solid;
      @include border_color("content-bg-color");
      border-radius: 4px;
      &:not(:first-child) {
        margin-left: 1px;
      }
      &.active {
        @include border_color("el-menu-hover-bg-color");
      }
    }
  }
  :deep(.tiptap-editor) {
    outline: none;
  }
}
</style>
