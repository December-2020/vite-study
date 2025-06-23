/*
 * @Author: Komorebi
 * @Date: 2025-05-15 17:07:11
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-06-23 09:58:38
 */
/**
 * 您要设置的任何插件都必须导入
 * 详细插件列表请参见https://www.tinymce.com/docs/plugins/
 * 自定义构建请参见https://www.tinymce.com/download/custom-builds/
 * colorpicker/contextmenu/textcolor插件现已内置于核心编辑器中，请将其从编辑器配置中删除
 */

/**
 * Help  显示帮助对话框
 * Image  将图像插入TinyMCE
 * Import CSS  自动将CSS类名填充到Format下拉列表中
 * Lists  规范浏览器之间的列表行为
 * Quick Toolbars   用户界面控件可更快地创建内容
 * Save  在TinyMCE工具栏中添加一个保存按钮
 * Table  表格编辑功能
 */
export const plugins = [
  /** 
   * 高级列表插件,该插件通过css扩展了默认的UL和OL列表样式
   * * 插件之间有可能存在依赖关系，advlist必须在lists插件启用的情况下才能使用
   */
  "advlist",
  "lists",
  // 创建可展开和可折叠的部分
  "accordion",
  // 插入锚点（有时称为书签）
  "anchor",
  // 自动创建超链接
  "autolink",
  // 自动调整TinyMCE的大小以适应内容
  "autoresize",
  // 自动保存内容
  "autosave",
  // 编辑内容的HTML源代码
  "code",
  // 插入并嵌入语法突出显示的代码段
  "codesample",
  // 用于设置内容从左到右或从右到左方向的工具栏按钮
  "directionality",
  // 全屏显示TinyMCE
  "fullscreen",
  // 将当前日期和/或时间插入TinyMCE
  "insertdatetime",
  // 向内容添加超链接
  "link",
  // 添加HTML5视频和音频元素
  "media",
  // 插入非换行空格
  "nonbreaking",
  // 添加分页符
  "pagebreak",
  // 以只读格式显示当前内容的对话框
  "preview",
  // 查找并替换TinyMCE中的内容
  "searchreplace",
  // 允许用户查看块级元素，如段落
  "visualblocks",
  // 显示不可见字符，如非换行空格
  "visualchars",
  // 显示字数统计
  "wordcount",
];

/**
 * lineheight（行高 5.5新增）
 * newdocument（新文档）
 * bold（加粗）
 * italic（斜体）
 * underline（下划线）
 * strikethrough（删除线）
 * alignleft（左对齐）
 * aligncenter（居中对齐）
 * alignright（右对齐）
 * alignjustify（两端对齐）
 * styleselect（格式设置）
 * formatselect（段落格式）
 * fontselect（字体选择）
 * fontsize（字号选择）
 * cut（剪切）
 * copy（复制）
 * paste（粘贴）
 * bullist（项目列表UL）
 * numlist（编号列表OL）
 * outdent（减少缩进）
 * indent（增加缩进）
 * blockquote（引用）
 * undo（撤销）
 * redo（重做/重复）
 * removeformat（清除格式）
 * subscript（下角标）
 * superscript（上角标）
 *
 * 使用toolbar来配置工具栏上可用的按钮，多个控件使用空格分隔，使用“|”来创建分组。
 * eg: undo redo | styleselect | bold italic | link image
 */
export const toolbar = [
  "blocks fontfamily fontsize lineheight bullist numlist",
  "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
  "forecolor backcolor hr  link  preview anchor pagebreak insertdatetime media fullscreen",
];
