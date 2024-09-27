/*
 * @Author: Komorebi
 * @Date: 2024-09-27 11:11:18
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-27 11:54:27
 */
import type { AppRouteRecordRaw } from "#/route";

const Charts: AppRouteRecordRaw = {
  //   path: "/charts",
  //   name: "Charts",
  //   redirect: "/charts/line",
  //   meta: {
  //     title: "图表",
  //   },
  //   children: [
  // {
  path: "/line",
  name: "Line",
  meta: {
    title: "折线图",
  },
  component: () => import("@/views/charts/line/index.vue"),
  // },
  //   ],
};

export default Charts;
