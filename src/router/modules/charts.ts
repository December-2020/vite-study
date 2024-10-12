/*
 * @Author: Komorebi
 * @Date: 2024-09-27 11:11:18
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-12 10:03:39
 */
import type { AppRouteRecordRaw } from "#/route";

import { LeftLayout } from "./constant";

const Charts: AppRouteRecordRaw = {
  path: "/charts",
  name: "Charts",
  redirect: "/charts/line",
  meta: {
    title: "图表",
  },
  component: LeftLayout,
  children: [
    {
      path: "line",
      name: "Line",
      meta: {
        title: "折线图",
      },
      component: () => import("@/views/charts/line/index.vue"),
    },
    {
      path: "histogram",
      name: "Histogram",
      meta: {
        title: "柱状图",
      },
      component: () => import("@/views/charts/histogram/index.vue"),
    },

    // 测试路由
    {
      path: "test",
      name: "Test",
      meta: {
        title: "测试路由",
      },
      children: [
        {
          path: "test1",
          name: "Test-1",
          meta: {
            title: "路由1",
          },
          component: () => import("@/views/test/index1.vue"),
        },
        {
          path: "test2",
          name: "Test-2",
          meta: {
            title: "路由2",
            hidden: true,
          },
          component: () => import("@/views/test/index2.vue"),
        },
        {
          path: "test3",
          name: "Test-3",
          meta: {
            title: "路由3",
            hidden: false,
          },
          component: () => import("@/views/test/index3.vue"),
        },
      ],
    },
  ],
};

export default Charts;
