# Vue 3 + TypeScript + Vite

## 一、项目介绍

本项目是一个 Vue3 的练手项目，ui 框架使用的是 element-ui ，之所以使用这个 ui，仅仅因为用顺手就懒得换了。全局状态管理用的是 pinia，请求是二次封装的 axios。有使用基于组合式 api 的函数集合 VueUse，看了下里面的 api，也有关于 state 相关的函数，但是已使用了 pinia，也懒得换了。为减少 css 命名，使用 UnoCSS 原子化 css。

## 二、项目启动

1. 安装依赖

```
npm install
```

或者执行命令

```
npm run bootstrap
```

2. 本地运行
   由于修改了 node_modules 中的包
   运行之前请先执行

```
npm run postinstall
```

将测试环境文件里面的 VITE_BASE_URL 请求路径改成服务器地址(与后端交互)
现在使用的是 Mock 模拟请求, 可忽略该条修改
然后执行命令

```
npm run dev
```

3. 打包代码

```
npm run build
```

## 三、目录结构

    |__ .vscode 一些推荐在vscode中开发的设置
    |__ apiTypes 模拟接口数据的类型声明
    |__ mock mock模拟数据
    |__ patches node_modules临时补丁
    |__ src
        |__ apis api相关
        |__ assets 静态资源
        |__ components 全局组件
            |__ composition 组合式写法(全局组件)
            |__ custom 定制组件(可以说是业务组件)
            |__ once 非全局组件(为业务组件服务的组件, 如: svg等)
            |__ options 选项式写法(部分组件的写法,仅供学习)
        |__ enums 枚举相关
        |__ hooks 通用函数
        |__ icons svg相关
            |__ common 通用svg
            |__ nav 仅导航栏使用
        |__ layout 全局布局文件
        |__ locals 国际化语言包
        |__ router 全局路由
        |__ store 全局状态管理
        |__ styles 全局样式
            |__ adapt 纯 css 计算窗口大小(暂未使用)
        |__ utils 工具函数
        |__ views 页面相关文件
            |__ charts 图表相关
            |__ common 登录页面、404页面等无需权限的页面
    |__ types 全局类型文件

## 四、目录相关

1、文件夹名称用小写（一个单词，例如：charts、login）  
2、组件用大写开头的英文单词组（例如：BaseButton、SvgIcon，除了 index 或者组件引用的内部独立组件 header 这种）  
3、页面用小写开头的英文单词组（例如：systemList、systemAdd、systemDetails ）
4、正常引用文件为根目录（例如 ·@/utils/route·）除类似页面引用对应页面组件可·./components/xxx·

## 五、template

1、命名需要语义化 （例如：base-select ）  
2、id、class 多单词使用-划线连接  
3、if、for、click...使用小写开头的英文单词组  
4、ref 使用小写开头的英文单词组，后面拼接上 El
5、格式化方案：自动格式化

```html
<div
  ref="listEl"
  v-if="list.length > 0"
  id="data-list"
  class="data-list"
  @click="handleDataClick"
>
  <div v-for="(item, index) in list">xxx</div>
</div>
```

## 六、javascript

1、命名：  
(1) 常量大写开头+下划线（Max_Page）

```javascript
const Max_Page = 1;
```

(2) 变量小写开头驼峰（userList）

```javascript
let userList = data;
```

(3) 类大写开头驼峰（Car、ProcessEditor）

```javascript
Class Car
```

(4) 私有变量命名前加下划线（\_this）

```javascript
let _this = this;
```

2、变量定义，不要使用 var(~~var str = ""~~)

```javascript
let str1 = "str1";
const Test_Str = "testStr";
```

3、依赖注入：静态 > 组件 > 函数

```javascript
import UserPhoto form '@/assets/images/user-photo.gif'
import BaseButton form '@/components/composition/BaseButton.vue'
import { post } form '@/utils/requestInstance'
```

4、export default 中内容编写顺序 (仅限选项式写法)

```javascript
components > props > data > computed > setup > mounted > methods > watch;
```

5、methods: init 初始化函数 > 按页面编写顺序编写函数（如：选择类型列表 => 选择类型 => 表单提交）

```javascript
methods: {
    init() {
        let form = this.form;
        this.$api.xxx(form).then(res => {
            this.data = res.data;
        });
    },
    typeChange(TypeID) {
        this.form.TypeID = TypeID;
        this.init();
    },
    baseChange(TypeID) {
        this.form.TypeID = TypeID;
        this.init();
    },
    submit() {
        let requestData = data;
        this.$api.xxx(requestData).then(res => {
            this.data = res.data;
        });
    }
}
```

## 七、style(lang="scss")

样式顺序：  
(1) 函数

```scss
@include no-warp(2);
```

(2) 伪类属性：content  
(3) 块级属性：display、float、position、top、right、bottom、left、z-index 等  
(4) 块级样式：width、height、margin、padding、background、border、out-line 等  
(5) 文本属性：font-family、font-size、font-weight、line-height 等  
(6) 文本样式：text-align、text-decoration、white-space、text-overflow、word-break 等  
(7) 动画属性：transition、animation 等

## 八、格式化配置

.prettierrc
{
"printWidth": 80,
"tabWidth": 2,
"useTabs": false,
"semi": true,
"singleQuote": true,
"proseWrap": "preserve",
"arrowParens": "avoid",
"bracketSpacing": true,
"disableLanguages": ["vue"],
"endOfLine": "auto",
"ignorePath": ".prettierignore",
"jsxBracketSameLine": false,
"jsxSingleQuote": false,
"requireConfig": false,
"trailingComma": "es5"
}

## 九、已安装依赖

- 统一浏览器样式  
  npm i normalize.css
- 安装 sass  
  npm i sass -D
- css 样式自动添上前缀  
  npm i autoprefixer -D
- vite 中使用 svg
  npm i vite-plugin-svg-icons -D
- 使用 element plus 的 ui
  npm i element-plus
- 按需自动引入插件
  npm i -D unplugin-vue-components unplugin-auto-import
- 安装 vue-router
  npm i vue-router@4
- css 动画库
  npm i animate.css
- path 模块无法在客户端代码中使用
  npm i path-browserify
  npm i @types/path-browserify -D
- 使用全局状态管理 pinia
  npm i pinia
- 缓存 pinia (页面刷新或路由回退, 状态会丢失)
  npm i pinia-plugin-persistedstate
- 国际化
  npm i vue-i18n
- UnoCss css 原子化
  npm i unocss -D
- 使用 axios
  npm i axios
- 全屏 (已有 VueUse, 可以先卸载)
  npm uninstall screenfull
- VueUse 是一款基于组合式 API 的函数集合
  npm i @vueuse/core
  安装 @vueuse/components
  npm i @vueuse/components
- nprogress 网页顶部进度条
  npm i nprogress
  npm i @types/nprogress -D
- 使用 cookie
  js-cookie (仅浏览器中使用)
  npm i js-cookie
  npm i @types/js-cookie -D
  universal-cookie (浏览器和 node.js 环境下都可使用, 可结合 VueUse)
  npm uninstall universal-cookie@^7
- 添加临时补丁, 修改 node_modules
  npm i patch-package postinstall-postinstall
- 修改第三方组件, 修改 nprogress/nprogress.js
  npx patch-package nprogress
- 使用 mock 模拟请求
  npm i mockjs
  vite 中使用还需安装插件, 但是 3.0.2(2024.11.7)最新版本不支持生产环境使用
  npm i vite-plugin-mock@2.9.8
- 在 setup 中自定义 name 属性
  3.3+ (3.3 版本及以上)
  ```
  defineOptions({ name: "组件名称" });
  ```
  以下版本可通过下面的 vite 插件进行设置
  npm uninstall vite-plugin-vue-setup-extend -D
- 使用 echarts 绘制图表
  npm i echarts
- 学习并使用 three.js
  npm uninstall three
  轨道控制器可以使得相机围绕目标进行轨道运动
  npm uninstall three-orbit-controls
- 使用 lodash 工具库
  npm i lodash
- 使用 TinyMCE 富文本编辑器
  npm i tinymce
- vue-devtools
  npm i vite-plugin-vue-devtools -D
  解决以下问题
  1. 有时候 Chrome 更新了，插件版本没跟上，就用不了了；
  2. 有些企业版浏览器或者特殊环境，根本装不了扩展；
  3. 移动端真机调试？很难用，几乎废了。
  仅在开发环境使用, 正式环境还是使用chrome插件

## 十、其他相关

1. svg 在线压缩

- [svg 压缩链接](https://www.zhangxinxu.com/sp/svgo/)

2. element plus 官网

- [Element Plus](https://element-plus.org/zh-CN/component/button.html)

3. vue-router@4 官网

- [vue-router](https://router.vuejs.org/zh/introduction.html)

4. 推荐的 css 动画库

- [animate.css 官网](https://animate.style/)
- [hover.css 官网](http://ianlunn.github.io/Hover/)

5. 使用 pinia

- [pinia](https://pinia.web3doc.top/introduction.html)

6. 推荐开发工具及相关插件

- [VS Code](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

7. Github 上一篇写的挺好的指南, 详解 vue2 和 vue3 的变化。

- [文档地址](https://vue3.chengpeiquan.com/upgrade.html)

8. vue-i18n 国际化

- [i18n 官网](https://vue-i18n.intlify.dev/)
- [i18n 参考文档](https://kazupon.github.io/vue-i18n/zh/started.html)

9. UnoCss

- [UnoCss 的 Github](https://github.com/unocss/unocss)
- [样式查询地址](https://uno.antfu.me/)

10. github 上值得一看的学习文档

- [js 进阶问题列表](https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md)
- [js 开发应知道的 33 个概念](https://github.com/stephentian/33-js-concepts)
- [js 风格编写指南](https://github.com/airbnb/javascript)
- [js 算法小册](https://github.com/TheAlgorithms/JavaScript/blob/master/Backtracking/AllCombinationsOfSizeK.js)
- [很棒的 js 库-国内翻译](https://github.com/jobbole/awesome-javascript-cn)
- [免费的编程书籍](https://github.com/EbookFoundation/free-programming-books/blob/main/books/free-programming-books-zh.md)
- [js 中奇怪的问题](https://github.com/denysdovhan/wtfjs/blob/master/README-zh-cn.md)
- [Vue3 入门指南与实战案例](https://vue3.chengpeiquan.com/upgrade.html)
- [计算机网络基础](https://github.com/wxlvip/Interviewer/blob/master/01.%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C.md)

11. Vue 组合式 API 的函数集合

- [VueUse 中文文档](https://www.vueusejs.com/guide/)

12. 抓包工具 whistle

- [whistle 官网](https://wproxy.org/whistle/)

13. 根据模板生成相应的代码片段

- [模板网站](https://snippet-generator.app/?description=&tabtrigger=&snippet=&mode=vscode)

14. Mock.js 参考示例

- [Mock.js demo](http://mockjs.com/examples.html)

15. 在线 Json 转 typescript 工具

- [网址](https://tooltt.com/json2typescript/)

16. 持久化存储 pinia

- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)

17. echarts 配置文档

- [echarts setOption](https://echarts.apache.org/zh/option.html#title)

18. three.js 介绍文档

- [three.js](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene)

19. TipTap 富文本编辑器
    富文本编辑器

- [TipTap](https://tiptap.dev/docs/editor/getting-started/install/vue3)

## 十一、github 上一些有趣开源的项目

1. FreeTube 是一款开源的桌面 YouTube 播放器，考虑到了隐私，可以在没有广告的情况下使用 YouTube，并阻止谷歌使用其 cookie 和 JavaScript 跟踪您。

- [FreeTube](https://github.com/FreeTubeApp/FreeTube)

2. LocalSend 是一款免费的文件共享开源应用程序，使用这个开源项目，你可以通过本地网络与附近的设备安全地共享文件和消息，而无需互联网连接。

- [LocalSend](https://github.com/localsend/localsend)
