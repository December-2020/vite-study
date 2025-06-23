<!--
 * @Author: Komorebi
 * @Date: 2025-05-09 15:34:33
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-06-23 16:58:15
-->
<template>
  <div class="editor-wrap">
    <textarea :id="tinymceId" ref="elRef" v-if="!initOptions.inline" />
    <slot v-else></slot>
  </div>
</template>

<!-- 菜单栏 工具栏 内容栏 共同组合成一个富文本 -->

<script setup lang="ts">
import type { Editor, RawEditorOptions } from "tinymce";

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
import "tinymce/plugins/image";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
// import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

import store from "@/store";
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
 * 明暗主题
 */
const theme = computed(() => `oxide${store.appSet.isDarkTheme ? "-dark" : ""}`);
/**
 * 国际化
 */
const language = computed(() => {
  const lang = store.appSet.lang;
  const Type = { "zh-CN": "zh_CN", "en-US": "en" };
  return Type[lang];
});
/**
 * 初始化配置
 * @see http://tinymce.ax-z.cn/configure/integration-and-setup.php
 */
const initOptions = computed((): RawEditorOptions => {
  const { height, options, toolbar, plugins } = props;
  const baseOptions: RawEditorOptions = {
    selector: `#${unref(tinymceId)}`,
    license_key: "gpl",
    height,
    toolbar,
    plugins,
    menubar: "file edit insert view format table",
    // 隐藏右下角技术支持
    branding: false,
    default_link_target: "_blank",
    // auto_focus: true,
    // 禁用链接对话框中的链接标题输入字段
    link_title: false,
    // 关闭图像、表格或媒体对象的大小调整手柄。
    // 默认情况下，此选项处于启用状态，允许您调整表格和图像的大小。
    object_resizing: false,
    /**
     * 修改皮肤路径的配置方式
     * 下列文件的来源是从node_modules中复制的
     */
    skin: theme.value,
    skin_url: `/src/assets/tinymce/skins/${theme.value}`,
    // 设置编辑器中可编辑区域内的样式
    content_css: `/src/assets/tinymce/skins/${theme.value}/content.min.css`,
    // 语言
    language: language.value,
    language_url:
      language.value === "en"
        ? ""
        : `/src/assets/tinymce/langs/${language.value}.js`,
    // 初始化前执行
    setup: function (editor) {
      editorRef.value = editor;
      editor.on("init", () => {
        setupEditor();
        // 主题、语言切换时, 不销毁已存在的内容
        // editor.setContent(model.value as string);
      });

      // 文本内容变化时, 同步到model
      editor.on("change keyup setcontent", () => {
        const content = editor.getContent();
        model.value = content;
        emit("change", content);
      });
    },
  };

  // 最后合并用户选项以允许覆盖默认值
  return {
    ...baseOptions,
    ...options,
  };
});

// 监听 initOptions 中的主题、语言变化
watch(
  () => [initOptions.value.skin, initOptions.value.language],
  () => {
    // console.log(model.value,'model');
    destroyEditor();
    initEditor();
  }
);

// 组件初始化
function initEditor() {
  // 确保dom元素已经准备好
  nextTick(() => {
    // 组件卸载时不显示textarea
    const el = unref(elRef);
    if (el) {
      el.style.visibility = "hidden";
    }

    tinymce
      .init(unref(initOptions))
      .then((editor) => {
        emit("inited", editor);
      })
      .catch((err) => {
        emit("init-error", err);
      });
  });
}

// 组件初始化完成
function setupEditor() {
  const editor = unref(editorRef);
  if (!editor) return;

  const value = model.value || "";
  editor.setContent(value as string);
  // console.log("🚀 ~ 初始化完成: " + editor.id);
}

// 组件销毁
function destroyEditor() {
  if (tinymce != null) {
    const { selector } = unref(initOptions);
    tinymce.remove(selector as string);
  }
  // console.log("🚀 ~ 组件销毁: ", tinymce);
}

// 生命周期钩子
onMountedOrActivated(() => {
  // inline 是开启内联模式, 默认为false
  if (!initOptions.value.inline) {
    tinymceId.value = buildShortUUID("tiny-vue");
  }
  nextTick(() => {
    // 销毁之前的实例
    destroyEditor();
    // 初始化实例
    initEditor();
  });
});

onBeforeUnmountOrDeactivated(() => {
  destroyEditor();
});
</script>

<style scoped lang="scss">
.editor-wrap {
  width: v-bind("editorWidth");

  :deep(.tox-tinymce) {
    .tox-promotion {
      display: none;
    }
  }
}
</style>
