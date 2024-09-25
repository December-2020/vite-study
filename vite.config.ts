/*
 * @Author: Komorebi
 * @Date: 2024-09-23 15:08:24
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-25 11:51:45
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// element 的按需自动导入配置
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// 组件自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// node 内置
import { resolve } from "path";
// css 自动添加前缀
import autoprefixer from "autoprefixer";
// 引入svg插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// 引入UnoCss
import UnoCss from "unocss/vite";
/**
 * 使用unocss的预设
 * 这些预设可在html中
 * 添加uno独有的样式属性
 * eg. <div hover="color-white bg-orange"></div>
 */
import { presetUno, presetAttributify } from "unocss";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  // const Env = loadEnv(mode, process.cwd(), '');
  const Env = loadEnv(mode, process.cwd());
  // console.log("🚀 ~ defineConfig ~ Env:", Env);

  return {
    /* 共享选项 */
    plugins: [
      vue(),
      AutoImport({
        // 自动引入 vue 的api
        imports: ["vue"],
        // 自动引入 element-plus
        resolvers: [ElementPlusResolver()],
        // 生成位置
        dts: "types/auto-import.d.ts",
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        /**
         * 借用插件可使组件自动注册
         * composition 组合式写法
         * options 选项式写法
         */
        dirs: ["src/components/composition"],
        extensions: ["vue", "tsx"],
        dts: "types/components.d.ts",
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      // UnoCss 添加配置
      UnoCss({
        // 手动配置的预设
        rules: [
          // eg: ["red", { color: "red" }],
          [/^font-size-(\d+)px$/, ([, d]) => ({ "font-size": `${d}px` })],
        ],
        // 自定义组合样式
        // shortcuts: {
        //   "app-header-icon":
        //     "cursor-pointer hover-bg-#f6f6f6 color-#3e3e3e p-t-14.5px p-r-10px p-b-14.5px p-l-10px",
        // },
        // 使用预设
        presets: [presetUno(), presetAttributify()],
      }),
    ],
    resolve: {
      // 以下文件在import时可以不写后缀
      // extensions: [".js", ".ts", ".vue"],
      alias: [
        // @/xxx => src/xxx
        {
          find: /@\//,
          replacement: pathResolve("src") + "/",
        },
        // #/xxx => types/xxx
        {
          find: /#\//,
          replacement: pathResolve("types") + "/",
        },
        /**
         * vue-i18n控制台会报黄色警告,不影响使用
         * 设置别名就不会显示警告
         */
        {
          find: "vue-i18n",
          replacement: "vue-i18n/dist/vue-i18n.cjs.js",
        },
      ],
    },
    css: {
      // vite 中已集成postcss
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "> 1%",
            ],
            grid: true,
          }),
        ],
      },
      // css预处理器
      preprocessorOptions: {
        // scss 全局变量
        scss: {
          /**
           * !导入的文件路径必须加上分号, 不然报错
           * !不能使用@import来导入, sass团队将废弃该语法
           */
          additionalData: `
            @use "./src/styles/variable.scss" as *;
          `,
        },
      },
    },

    /* 开发服务器选项 */
    server: {
      // 显示ipv4地址 监听所有地址，包括局域网和公网地址。
      host: true,
      // 端口号 8080
      port: 5173,
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      strictPort: true,
      // 在开发服务器启动时自动在浏览器中打开应用程序
      open: true,
      // 设置代理  https://github.com/http-party/node-http-proxy#options
      proxy: {
        // 正则表达式写法：http://localhost:5173/api/bar -> http://192.168.2.221:8500/bar
        "^/api": {
          // 代理目标
          target: Env.VITE_BASE_URL,
          //
          /**
           * 将主机头的起始位置更改为目标URL
           * 默认情况下, 代理时会保留主机头的来源,
           * 设为true会覆盖该默认行为,
           * 发送请求头中host会设置成target。
           */
          changeOrigin: true,
          // 重写路径
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },

    /* 构建选项 */
    build: {
      rollupOptions: {
        output: {
          // 打包输出分类
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          // manualChunks(id) {
          //   // 对超大静态资源进行拆分
          //   if (id.includes("node_modules")) {
          //     return id
          //       .toString()
          //       .split("node_modules/")[1]
          //       .split("/")[0]
          //       .toString();
          //   }
          // },
        },
      },
    },
  };
});

// 返回相对于当前的工作目录
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}
