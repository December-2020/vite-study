/*
 * @Author: Komorebi
 * @Date: 2024-09-27 11:14:49
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-08 11:02:51
 */
import type { Router } from "vue-router";

// NProgress是页面跳转或者发生异步请求是浏览器顶部的进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
import { useTitle } from "@vueuse/core";
import { useI18n } from "@/hooks/useI18n";
import { WHITE_NAME_LIST } from "@/router/modules/constant";

// 隐藏右上角的进度环
NProgress.configure({ showSpinner: false });

export const routerGuard = (router: Router) => {
  // 路由前置守卫
  router.beforeEach((to, from, next) => {
    /**
     * 控制进度条显示位置
     * 可以通过 parent 更改进度条显示位置
     * 这里由于 header 底部有边框
     * 如果再设置会重合在一起, 不太好看就不设置了
     */
    // if (document.getElementById("app-main")) {
    //   NProgress.configure({ parent: "#app-main" });
    // }
    NProgress.start();
    // 设置页面标题
    useTitle(useI18n(to.meta.title, "Route"));
    // 判断用户是否登录
    const hasToken = store.user.userToken;
    if (hasToken) {
      // 如果有 token 并且即将去登录页面
      if (to.name === "Login") {
        next({ path: "/" });
      } else {
        next();
      }
    } else {
      // 无 token
      if (WHITE_NAME_LIST.includes(to.name as string)) {
        next();
      } else {
        next(`/login?redirect=${to.path}`);
      }
    }
  });

  // 路由后置钩子
  router.afterEach(() => {
    // 完成进度条
    NProgress.done();
  });
};
