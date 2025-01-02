/*
 * @Author: Komorebi
 * @Date: 2024-11-22 14:52:04
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-02 14:51:21
 */
import { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError } from "../_util";

const countList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 4; i++) {
    result.push({
      id: /[a-z]{2}[A-Z]{4}\d{10}/,
      title: "@ctitle(3)",
      type: "@cword('年季月周日',1)",
      total: "@integer(20, 200)",
      orders:"@integer(0, 100)"
    });
  }
  return result;
})();

const data = {
  // 统计
  countList,
};

export default [
  {
    url: "/api/chart/get_line",
    timeout: 1000,
    method: "post",
    response: () => {
      return resultSuccess(data);
    },
  },
] as MockMethod[];
