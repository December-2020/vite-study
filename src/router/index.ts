/*
 * @Author: Komorebi
 * @Date: 2024-09-26 11:26:00
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-19 13:51:58
 */
import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
import type { AppRouteRecordRaw } from "#/route";

import { createRouter, createWebHistory } from "vue-router";
import { constantRoutes } from "./modules/constant";
// import { WHITE_NAME_LIST, constantRoutes } from "./constant";

// 异步路由(需要权限之类的)
const asyncRoutes: AppRouteRecordRaw[] = [];
// 类型断言: 每个模块的默认导出都是 AppRouteRecordRaw 类型或 AppRouteRecordRaw[] 类型
const modules = import.meta.glob("./modules/!(constant).ts", {
  eager: true,
}) as Record<string, { default?: AppRouteRecordRaw | AppRouteRecordRaw[] }>;
Object.keys(modules).forEach((key) => {
  const module = modules[key].default || {};
  const moduleList = Array.isArray(module) ? module : [module];
  asyncRoutes.push(...moduleList);
});

const routeList: AppRouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/charts",
    meta: {
      hidden: true,
    },
  },
  ...constantRoutes,
  ...asyncRoutes,
  // 无匹配时404路由必须放最后
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: {
      hidden: true,
    },
  },
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
