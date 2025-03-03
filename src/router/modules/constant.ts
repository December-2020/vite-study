/*
 * @Author: Komorebi
 * @Date: 2024-09-27 11:02:36
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-03-03 09:42:59
 */
import type { AppRouteRecordRaw } from "#/route";

/**
 * 本地路由(所有人都可访问)
 */
// 根路由
export const Root_Route: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: "/charts",
  meta: {
    hidden: true,
  },
};
// 登录页面
export const Login_Route: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  meta: {
    title: "common.login",
    hidden: true,
  },
  component: () => import("@/views/common/login/index.vue"),
};
// 404 路由页面
export const Error_404_Route: AppRouteRecordRaw = {
  /**
   * 从 vue2 向 vue3 迁移
   * @see https://router.vuejs.org/zh/guide/migration/
   */
  // path: "/:pathMatch(.*)*",
  path: "/404",
  name: "404",
  meta: {
    hidden: true,
  },
  component: () => import("@/views/common/404/index.vue"),
};
// 重定向页面
export const Redirect_Route: AppRouteRecordRaw = {
  path: "/redirect/:path(.*)*",
  name: "Redirect",
  meta: {
    hidden: true,
  },
  component: () => import("@/views/common/redirect/index.vue"),
};
// 无匹配路由, 重定向到 404 页面
export const No_Match_Route: AppRouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "NoMatch",
  redirect: "/404",
  meta: {
    hidden: true,
  },
};

export const constantRoutes: AppRouteRecordRaw[] = [
  Login_Route,
  Root_Route,
  Error_404_Route,
  Redirect_Route,
];

/**
 * 白名单 通用页面
 * "404", "401"
 * 路由的name具有唯一性
 */
export const WHITE_NAME_LIST:string[] = [];
const getRouteNames = (routes: AppRouteRecordRaw[])=> {
  routes.forEach((route) => {
    WHITE_NAME_LIST.push(route.name as string);
    getRouteNames(route.children || []);
  })
}
getRouteNames(constantRoutes);

/**
 * @description: 通用页面布局
 */
export const PageLayout = () => import("@/layout/left.vue");
