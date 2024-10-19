/*
 * @Author: Komorebi
 * @Date: 2024-09-27 11:11:18
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-19 14:28:02
 */
import type { AppRouteRecordRaw } from "#/route";

import { LeftLayout } from "./constant";

const Charts: AppRouteRecordRaw = {
  path: "/charts",
  name: "Charts",
  redirect: "/charts/line",
  meta: {
    title: "chart.title",
    icon: "charts",
  },
  component: LeftLayout,
  children: [
    {
      path: "line",
      name: "Line",
      meta: {
        title: "chart.line",
      },
      component: () => import("@/views/charts/line/index.vue"),
    },
    {
      path: "histogram",
      name: "Histogram",
      meta: {
        title: "chart.histogram",
      },
      component: () => import("@/views/charts/histogram/index.vue"),
    },

    // 测试路由
    {
      path: "test",
      name: "Test",
      meta: {
        title: "chart.test",
      },
      children: [
        {
          path: "test1",
          name: "Test-1",
          meta: {
            title: "chart.test1",
          },
          component: () => import("@/views/test/index1.vue"),
        },
        // {
        //   path: "test2",
        //   name: "Test-2",
        //   meta: {
        //     title: "chart.test2",
        //     hidden: true,
        //   },
        //   component: () => import("@/views/test/index2.vue"),
        // },
        {
          path: "test3",
          name: "Test-3",
          meta: {
            title: "chart.test3",
            hidden: false,
          },
          component: () => import("@/views/test/index3.vue"),
        },
      ],
    },
  ],
};

export default Charts;
