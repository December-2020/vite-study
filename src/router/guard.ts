/*
 * @Author: Komorebi
 * @Date: 2024-09-27 11:14:49
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-28 10:20:41
 */
import type { Router, RouteRecordRaw } from "vue-router";

// NProgress是页面跳转或者发生异步请求是浏览器顶部的进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
import { useTitle } from "@vueuse/core";
import { useI18n } from "@/hooks/useI18n";
// import { addRoutes, getAsyncRoutes } from "@/router";
import { WHITE_NAME_LIST, No_Match_Route } from "@/router/modules/constant";

// 隐藏右上角的进度环
NProgress.configure({ showSpinner: false });
// 判断路由是不是初次进入或者刷新，避免路由死循环
// let registerRouteFresh = true;

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
        /* if (registerRouteFresh) {
          const routeList = getAsyncRoutes();
          routeList.push(No_Match_Route as RouteRecordRaw);
          addRoutes(routeList);
          registerRouteFresh = false;
          next({ ...to, replace: true });
          return;
        } */
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
