/*
 * @Author: Komorebi
 * @Date: 2024-11-07 11:06:31
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-07 14:13:32
 */
import { MockMethod } from "vite-plugin-mock";

import { resultSuccess, resultError } from "../_util";

const userInfo = {
  name: "@first",
  token: "@word(30)",
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
