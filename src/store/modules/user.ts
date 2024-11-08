/*
 * @Author: Komorebi
 * @Date: 2024-11-08 09:32:43
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-08 14:28:51
 */
import { defineStore } from "pinia";
import {
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
} from "@/utils/user";

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
    logout() {
      removeToken();
      this.userToken = "";
      setUserInfo(null);
      this.userInfo = null as unknown as object;
    },
  },
});

export default useUser;
