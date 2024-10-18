/*
 * @Author: Komorebi
 * @Date: 2024-09-27 11:14:49
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-18 17:00:34
 */
import type { Router } from "vue-router";

// NProgress是页面跳转或者发生异步请求是浏览器顶部的进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useTitle } from "@vueuse/core";
import { useI18n } from "@/hooks/useI18n";

// 隐藏右上角的进度环
NProgress.configure({ showSpinner: false });

export const routerGuard = (router: Router) => {
  // 路由前置守卫
  router.beforeEach((to) => {
    /**
     * 控制进度条显示位置
     * 可以通过 parent 更改进度条显示位置
     * 这里由于 header 底部有边框
     * 如果再设置会重合在一起, 不太好看就不设置了
     */
    // if (document.getElementById("app-main")) {
    //   NProgress.configure({ parent: "#app-main" });
    // }
    /** 
     * 开始进度条
     * TODO: nprogress 会在导航栏切换的一瞬间影响页面主题色, 待后续完善吧
     */
    NProgress.start();
    useTitle(useI18n(to.meta.title, "Route"));
  });

  // 路由后置钩子
  router.afterEach(() => {
    // 完成进度条
    NProgress.done();
  });
};
