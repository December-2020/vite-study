/*
 * @Author: Komorebi
 * @Date: 2024-11-07 11:06:31
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-07 13:58:09
 */
import { MockMethod } from "vite-plugin-mock";

import { resultSuccess, resultError } from "../_util";

const userInfo = {
  name: "@first",
  token:"@word(30)"
};

export default [
  {
    url: "/api/account/getAccountInfo",
    timeout: 1000,
    method: "get",
    response: () => resultSuccess(userInfo),
  },
] as MockMethod[];
