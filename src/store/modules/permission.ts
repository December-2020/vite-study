// 权限路由
import type { AppRouteRecordRaw } from "#/route";

import { defineStore } from "pinia";
import { asyncRoutes } from "@/router";
import { No_Match_Route } from "@/router/modules/constant";

const usePermissionStore = defineStore("appPermission", {
  state: () => ({
    // 用户权限
    // permissionList: [],
    // 菜单列表
    // menuList: [],
    // 路由是否动态添加
    isDynamicAddedRoute: false,
  }),

  getters: {
    // getMenuList: (state) => state.menuList,
    getIsDynamicAddedRoute: (state) => state.isDynamicAddedRoute,
  },

  actions: {
    setDynamicAddedRoute(flag: boolean = true) {
      this.isDynamicAddedRoute = flag;
    },
    buildRoutes(): Promise<AppRouteRecordRaw[]> {
      const routeList: AppRouteRecordRaw[] = [...asyncRoutes];
      /**
       * 获取所有路由列表 asyncRoutes
       * 在这里可以进一步做处理
       * 比如筛选出无需隐藏的路由、角色控制、权限控制
       * 目前没有需要处理的
       */
      //   asyncRoutes.forEach((route) => {
      //     routeList.push(route);
      //   });
      // 无匹配时404路由必须放最后
      routeList.push(No_Match_Route);
      return new Promise((resolve) => {
        resolve(routeList);
      });
    },
    resetState() {
      this.setDynamicAddedRoute(false);
    },
  },
});

export default usePermissionStore;
