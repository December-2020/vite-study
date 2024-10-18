/*
 * @Author: Komorebi
 * @Date: 2024-09-27 11:02:36
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-18 11:32:50
 */
import type { AppRouteRecordRaw } from "#/route";

/**
 * 本地路由(所有人都可访问)
 */
export const Login_Route: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  meta: {
    title: "common.login",
    hidden: true,
  },
  component: () => import("@/views/common/login/index.vue"),
};
export const Error_404_Route: AppRouteRecordRaw = {
  /**
   * 从 vue2 向 vue3 迁移
   * https://router.vuejs.org/zh/guide/migration/
   */
  // path: "/:pathMatch(.*)*",
  path: "/404",
  name: "404",
  meta: {
    hidden: true,
  },
  component: () => import("@/views/common/404/index.vue"),
};

export const constantRoutes: AppRouteRecordRaw[] = [
  Login_Route,
  Error_404_Route,
];

/**
 * 白名单 通用页面
 * "404", "401"
 * 路由的name具有唯一性
 */
export const WHITE_NAME_LIST = ["Login", "404", "Redirect"];

/**
 * @description: 通用页面布局
 */
export const LeftLayout = () => import("@/layout/left.vue");
