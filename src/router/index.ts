/*
 * @Author: Komorebi
 * @Date: 2024-09-26 11:26:00
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-27 14:23:54
 */
import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
import type { AppRouteRecordRaw } from "#/route";
import type { FileImport } from "#/global";

import { createRouter, createWebHistory } from "vue-router";
import { constantRoutes } from "./modules/constant";
// import { WHITE_NAME_LIST, constantRoutes } from "./constant";

// 异步路由(需要权限之类的)
const asyncRoutes: AppRouteRecordRaw[] = [];
/**
 * * 导入所有 非constant 的相关路由
 * ? 这里的 FileImport 是不该存在的
 * ? 若后续有更好的写法再改
 */
const modules: FileImport = import.meta.glob("./modules/!(constant).ts", {
  eager: true,
});
Object.keys(modules).forEach((key) => {
  //// @ts-ignore
  const module = modules[key].default || {};
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
