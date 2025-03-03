/*
 * @Author: Komorebi
 * @Date: 2024-09-26 11:26:00
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-03-03 16:54:15
 */
import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
import type { AppRouteRecordRaw } from "#/route";

import { createRouter, createWebHistory } from "vue-router";
import {
  constantRoutes,
  WHITE_NAME_LIST,
  // No_Match_Route,
} from "./modules/constant";
import { checkDuplicateRouteNames } from "./check";

const routeModuleList: AppRouteRecordRaw[] = [];
// 类型断言: 每个模块的默认导出都是 AppRouteRecordRaw 类型或 AppRouteRecordRaw[] 类型
const modules = import.meta.glob("./modules/!(constant).ts", {
  eager: true,
}) as Record<string, { default?: AppRouteRecordRaw | AppRouteRecordRaw[] }>;
Object.keys(modules).forEach((key) => {
  const module = modules[key].default || {};
  const moduleList = Array.isArray(module) ? module : [module];
  routeModuleList.push(...moduleList);
});
// 开发环境下检查路由 name 是否重复
const Env = import.meta.env;
if (Env.DEV) {
  checkDuplicateRouteNames(routeModuleList);
}
export const asyncRoutes = [...routeModuleList];

const routeList: AppRouteRecordRaw[] = [
  ...constantRoutes,
  // ...asyncRoutes,
  // 无匹配时404路由必须放最后
  // No_Match_Route,
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

// 重置路由
export const resetRouter = () => {
  const routeList = router.getRoutes();
  // 移除动态路由
  routeList.forEach((route) => {
    if (!WHITE_NAME_LIST.includes(route.name as string)) {
      router.hasRoute(route.name as string) &&
        router.removeRoute(route.name as string);
    }
  });
  // 不刷新页面的情况下修改当前页面的历史记录
  // history.replaceState(null, "", "/");
};
