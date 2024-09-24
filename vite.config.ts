/*
 * @Author: Komorebi
 * @Date: 2024-09-23 15:08:24
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-24 17:04:29
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// element 的按需自动导入配置
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// 组件自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  // const Env = loadEnv(mode, process.cwd(), '');
  const Env = loadEnv(mode, process.cwd());
  // console.log("🚀 ~ defineConfig ~ Env:", Env);

  return {
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
    ],

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
