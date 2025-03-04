/*
 * @Author: Komorebi
 * @Date: 2024-09-27 11:14:49
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-03-04 16:37:35
 */
import type { Router } from "vue-router";

// NProgress是页面跳转或者发生异步请求是浏览器顶部的进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
import { useTitle } from "@vueuse/core";
import { useI18n } from "@/hooks/useI18n";
// import { resetRouter } from "@/router";
import { WHITE_NAME_LIST, Login_Route } from "@/router/modules/constant";

// 隐藏右上角的进度环
NProgress.configure({ showSpinner: false });

export const routerGuard = (router: Router) => {
  // 路由前置守卫
  router.beforeEach(async (to, from, next) => {
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
    // 在白名单中
    if (WHITE_NAME_LIST.includes(to.name as string)) {
      // 如果有token并且跳转到登录页
      if (to.path === Login_Route.path && hasToken) {
        await store.user.afterLogin();
        next({ path: "/" });
        return;
      }
      next();
      return;
    }

    // 未带token
    if (!hasToken) {
      // 重定向到登录页面并携带当前页面的路径
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: Login_Route.path,
        replace: true,
      };
      if (to.fullPath) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.fullPath,
        };
      }
      next(redirectData);
      return;
    }

    // 动态路由加载(首次)
    if (!store.permission.getIsDynamicAddedRoute) {
      await store.user.afterLogin();
      // 现在的to动态路由加载之前的，可能为PAGE_NOT_FOUND_ROUTE（例如，登陆后，刷新的时候）
      // 此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
      return;
    }

    // 正常访问
    next();
  });

  // 路由后置钩子
  router.afterEach((to) => {
    // 完成进度条
    NProgress.done();
  });
};
