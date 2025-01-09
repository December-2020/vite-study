/*
 * @Author: Komorebi
 * @Date: 2024-11-22 14:52:04
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-09 15:47:25
 */
import { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError } from "../_util";

const scopeNum = (min: number, max: number) => `@integer(${min}, ${max})`

const countList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 4; i++) {
    result.push({
      id: /[a-z]{2}[A-Z]{4}\d{10}/,
      title: "@ctitle(3)",
      type: "@cword('年季月周日',1)",
      total: scopeNum(20, 200),
      orders: scopeNum(0, 100),
    });
  }
  return result;
})();

const _dayList = ["Last Mon", "Last Tue", "Last Wed", "Last Thu", "Last Fri", "Last Sat", "Last Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayList = (() => {
  const result: any[] = _dayList.map(item => ({
    day: item,
    num: scopeNum(10, 200),
    price: scopeNum(20, 100)
  }));
  return result
})();

const _typeList = ["Vue", "TypeScript", "Scss", "Html"];
const typeList = (() => {
  const result: any[] = _typeList.map((item, index) => {
    let min = 300;
    let max = 600;
    if (index === 0) {
      min = 4000;
      max = 4500;
    } else if (index === 1) {
      min = 3000;
      max = 3500;
    }
    return {
      name: item,
      value: scopeNum(min, max),
    }
  });
  return result
})()

const _skillList = ["销售", "管理", "信息技术", "客服", "研发", "市场"];
const skillList = (() => {
  // const result: any[] = _skillList.map(item => ({
  //   type: item,
  //   value: scopeNum(0, 5)
  // }))
  const result: any[] = _skillList.map(item => scopeNum(0, 5))
  return result
})()

const data = {
  // 统计
  countList,
  // 日访问量
  dayList,
  // 语言类型
  typeList,
  // 能力分布
  skillList
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
