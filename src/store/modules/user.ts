/*
 * @Author: Komorebi
 * @Date: 2024-11-08 09:32:43
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-03-03 16:41:14
 */
import type { RouteRecordRaw } from "vue-router";

import { defineStore } from "pinia";
import {
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
} from "@/utils/user";
import usePermissionStore from "./permission";
import router from "@/router";

const useUser = defineStore("user", {
  state: () => ({
    userToken: getToken() ?? "",
    userInfo: getUserInfo(),
  }),

  actions: {
    login(info: object) {
      // @ts-ignore
      let { token } = info;
      setToken(token);
      this.userToken = token;

      let _info = { ...info };
      // 删除对象中的 token 属性
      Reflect.deleteProperty(_info, "token");
      setUserInfo(_info);
      this.userInfo = _info;
    },
    /**
     * 其实可以不用写在这里
     * 基本与 user 中的state无关
     * 考虑到是登录后才有的
     */
    async afterLogin() {
      const permissionStore = usePermissionStore();
      // 动态路由加载（首次）
      if (!permissionStore.getIsDynamicAddedRoute) {
        const routes = await permissionStore.buildRoutes();
        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw);
        });
        permissionStore.setDynamicAddedRoute();
      }
    },
    logout() {
      removeToken();
      this.userToken = "";
      setUserInfo(null);
      this.userInfo = null as unknown as object;
    },
  },
});

export default useUser;
