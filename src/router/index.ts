/*
 * @Author: Komorebi
 * @Date: 2024-09-26 11:26:00
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-27 11:26:27
 */
import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
import type { AppRouteRecordRaw } from "#/route";

import { createRouter, createWebHistory } from "vue-router";
import { WHITE_NAME_LIST, constantRoutes } from "./constant";

// 异步路由(需要权限之类的)
const asyncRoutes: AppRouteRecordRaw[] = [];
const modules = import.meta.glob("./modules/*.ts", { eager: true });
Object.keys(modules).forEach((key) => {
  //// @ts-ignore
  const module = modules[key].default || {};
  console.log("🚀 ~ Object.keys ~ modules[key]:", modules[key]);
  const moduleList = Array.isArray(module) ? module : [module];
  asyncRoutes.push(...moduleList);
});

const routeList: AppRouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
    meta: {
      hidden: true,
    },
  },
  ...constantRoutes,
  ...asyncRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes: routeList as unknown as RouteRecordRaw[],
});

export default router;

// 注册路由
export const registerRouter = (app: App) => {
  app.use(router);
};
