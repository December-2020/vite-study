/*
 * @Author: Komorebi
 * @Date: 2024-11-07 11:06:31
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-08 11:25:28
 */
import { MockMethod } from "vite-plugin-mock";

import { resultSuccess, resultError } from "../_util";

const userInfo = {
  name: "@first",
  token: "@word(30)",
  birthday: "@date('yyyy-MM-dd')",
  gender: '@cword("男女",1)',
};

export default [
  {
    url: "/api/account/getAccountInfo",
    timeout: 1000,
    method: "post",
    // response: ({ body }) => {
    //   console.log("🚀 ~ params:", body);
    //   return resultSuccess(userInfo);
    // },
    response: () => {
      return resultSuccess(userInfo);
    },
  },
] as MockMethod[];
