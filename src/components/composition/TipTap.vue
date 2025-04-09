<!--
 * @Author: Komorebi
 * @Date: 2025-03-28 11:17:22
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-04-09 17:30:15
-->
<template>
  <div class="tiptap-wrap">
    <!-- 文字命令行 -->
    <div class="command-text">文件 编辑 插入 视图 格式</div>
    <!-- 工具栏 -->
    <div class="tool-icon flex">
      <div
        v-for="item in IconList"
        :key="item.key"
        :class="['tool-icon_item', { active: activeIcon(item.key) }]"
        @click="toggleIcon(item)"
      >
        <SvgIcon :icon-class="`richtext-${item.key}`" />
      </div>
    </div>
    <!-- 编辑器 -->
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
// import Strike  from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";

interface IconItem {
  key: string;
  fn: string;
  value?: string;
}

const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [StarterKit, Underline, TextAlign],
  editorProps: {
    attributes: {
      class: "tiptap-editor",
    },
  },
});

/* 第一行icon */
const IconList: IconItem[] = [
  { key: "bold", fn: "toggleBold" },
  { key: "italic", fn: "toggleItalic" },
  { key: "font_underline", fn: "toggleUnderline" },
  // { key: "font_strikethrough", fn: "toggleStrikethrough" },
  { key: "align_left", fn: "setTextAlign", value: "left" },
  { key: "align_center", fn: "setTextAlign", value: "center" },
  { key: "align_right", fn: "setTextAlign", value: "right" },
];
/**
 * editor.chain().focus().toggleBold().run()
 *
 * bold => toggleBold ✓
 * italic => toggleItalic ✓
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
const toggleIcon = (item: IconItem) => {
  const { key, fn, value } = item;
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
  // 富文本框执行指令
   if (value) {
    editor.value.chain().focus()[fn](value).run();
  } else {
    editor.value.chain().focus()[fn]().run();
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
