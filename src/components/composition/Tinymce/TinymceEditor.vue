<!--
 * @Author: Komorebi
 * @Date: 2025-05-09 15:34:33
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-06-11 14:00:10
-->
<template>
  <div class="editor-wrap">
    <textarea :id="tinymceId" ref="elRef" v-if="!initOptions.inline" />
    <slot v-else></slot>
  </div>
</template>

<!-- 菜单栏 工具栏 内容栏 共同组合成一个富文本 -->

<script setup lang="ts">
import type { Editor, RawEditorOptions, EditorEvent } from "tinymce";

import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default/icons";
import "tinymce/models/dom";
/**
 * tinymce插件可按需导入
 * @see https://www.tiny.cloud/docs/tinymce/latest/plugins/#open-source-plugins
 */
import "tinymce/plugins/advlist";
import "tinymce/plugins/lists";
import "tinymce/plugins/accordion";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
// import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

// import store from "@/store";
import { buildShortUUID } from "@/utils/uuid";
import { plugins as defaultPlugins, toolbar as defaultToolbar } from "./config";
import {
  onMountedOrActivated,
  onBeforeUnmountOrDeactivated,
} from "@/hooks/useActivate";

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
const emit = defineEmits(["change", "inited", "init-error"]);

const tinymceId = ref<string>(buildShortUUID("tiny-vue"));
// textarea的ref
const elRef = ref<HTMLElement | null>(null);
const editorRef = ref<Editor | null>(null);

// 计算组件宽度
const editorWidth = computed(() => {
  const width = props.width;
  if (typeof width === "number") {
    return `${width}px`;
  }
  return width;
});

/**
 * TODO: 计算主题色
 */
// const theme = computed(() => (store.appSet.isDarkTheme ? "dark" : "customed"));
/**
 * TODO: 国际化
 */
/**
 * TODO: 初始化配置
 * @see http://tinymce.ax-z.cn/configure/integration-and-setup.php
 */
const initOptions = computed((): RawEditorOptions => {
  const { height, options, toolbar, plugins } = props;
  return {
    selector: `#${unref(tinymceId)}`,
    license_key: "gpl",
    height,
    toolbar,
    plugins,
    /**
     * 默认配置
     *
     * tools 可显示
     * table help 添加后无显示
     */
    menubar: "file edit insert view format",
    // 隐藏右下角技术支持
    branding: false,
    default_link_target: "_blank",
    // auto_focus: true,
    // 禁用链接对话框中的链接标题输入字段
    link_title: false,
    // 关闭图像、表格或媒体对象的大小调整手柄。
    // 默认情况下，此选项处于启用状态，允许您调整表格和图像的大小。
    object_resizing: false,
    /* skin: "oxide",
    skin_url: "/src/assets/tinymce/skins/oxide/skin.min.css",
    // 设置编辑器中可编辑区域内的样式
    content_css: "/src/assets/tinymce/skins/oxide/content.min.css", */
    /**
     * 覆盖默认配置
     */
    ...options,
    // 初始化前执行
    setup: function (editor) {
      console.log("🚀 ~ initOptions ~ editor:", editor);
      editorRef.value = editor;
      // console.log("ID为: " + editor.id + " 的编辑器即将初始化.");
      editor.on("init", (e) => setupEditor(e));
    },
  };
});

// 组件初始化
function initEditor() {
  /* const el = unref(elRef);
  if (el) {
    // visible
    el.style.visibility = "";
  } */
  tinymce
    .init(unref(initOptions))
    .then((editor) => {
      emit("inited", editor);
    })
    .catch((err) => {
      emit("init-error", err);
    });
}
// 组件初始化完成
function setupEditor(e: EditorEvent<any>) {
  const editor = unref(editorRef);
  if (!editor) return;

  const value = model.value || "";
  editor.setContent(value as string);
  console.log("🚀 ~ 初始化完成: " + editor.id);
}
// 组件销毁
function destroyEditor() {
  if (tinymce != null) {
    const { selector } = unref(initOptions);
    tinymce.remove(selector as string);
  }
  console.log("🚀 ~ 组件销毁: ", tinymce);
}

// 生命周期钩子
onMountedOrActivated(() => {
  // inline 是开启内联模式, 默认为false
  if (!initOptions.value.inline) {
    tinymceId.value = buildShortUUID("tiny-vue");
  }
  nextTick(() => {
    initEditor();
  });
});
onBeforeUnmountOrDeactivated(() => {
  destroyEditor();
});
</script>

<style scoped lang="scss">
@import "/src/assets/tinymce/skins/oxide/content.min.css";
@import "/src/assets/tinymce/skins/oxide/skin.min.css";

.editor-wrap {
  width: v-bind("editorWidth");

  :deep(.tox-tinymce) {
    visibility: visible !important;
    height: 100% !important;
  }
}
</style>
