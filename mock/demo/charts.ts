import { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError } from "../_util";

const countList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 3; i++) {
    result.push({
      id: /[a-z]{2}[A-Z]{4}\d{10}/,
      title: "@ctitle(3)",
      type: "@cword('月周日',1)",
      total: "@integer(20, 100)",
      orders:"@integer(0, 20)"
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
