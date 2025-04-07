<!--
 * @Author: Komorebi
 * @Date: 2025-03-28 11:17:22
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-04-07 14:46:17
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
      <!-- <div class="tool-icon_item">
        <SvgIcon icon-class="richtext-bold" />
      </div>
      <div class="tool-icon_item">
        <SvgIcon icon-class="richtext-italic" />
      </div>
      <div class="tool-icon_item">
        <SvgIcon icon-class="richtext-font_underline" />
      </div>
      <div class="tool-icon_item">
        <SvgIcon icon-class="richtext-font_strikethrough" />
      </div>
      <div class="tool-icon_item">
        <SvgIcon icon-class="richtext-align_left" />
      </div>
      <div class="tool-icon_item">
        <SvgIcon icon-class="richtext-align_center" />
      </div>
      <div class="tool-icon_item">
        <SvgIcon icon-class="richtext-align_right" />
      </div> -->
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
const iconKeyList = reactive<string[]>([]);
const activeIcon = computed(() => {
  return (key: string) => iconKeyList.includes(key);
});
const toggleIcon = (key: string) => {
  let index = iconKeyList.indexOf(key);
  if (index === -1) {
    iconKeyList.push(key);
    return;
  }
  iconKeyList.splice(index, 1);
};
</script>

<style scoped lang="scss">
.tiptap-wrap {
  .tool-icon {
    &_item {
      cursor: pointer;
      padding: 2px;
      border: 1px solid;
      @include border_color("content-bg-color");
      &:not(:first-child) {
        margin-left: 5px;
      }
      &.active {
        @include border_color("el-menu-hover-bg-color");
      }
    }
  }
}
</style>
