/**
 * 您要设置的任何插件都必须导入
 * 详细插件列表请参见https://www.tinymce.com/docs/plugins/
 * 自定义构建请参见https://www.tinymce.com/download/custom-builds/
 * colorpicker/contextmenu/textcolor插件现已内置于核心编辑器中，请将其从编辑器配置中删除
 */

/**
 * advlist 高级列表插件,该插件通过css扩展了默认的UL和OL列表样式
 *   * 插件之间有可能存在依赖关系，advlist必须在lists插件启用的情况下才能使用
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
export const plugins = [
  "advlist anchor autolink autosave code codesample  directionality fullscreen insertdatetime link lists media nonbreaking pagebreak preview save searchreplace visualblocks visualchars wordcount",
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
 * fontsizeselect（字号选择）
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
  "fontsizeselect lineheight searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
  "bullist numlist link  preview anchor pagebreak insertdatetime media fullscreen",
];
