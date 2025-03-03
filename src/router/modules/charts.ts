/*
 * @Author: Komorebi
 * @Date: 2024-09-27 11:11:18
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-11 14:48:25
 */
import type { AppRouteRecordRaw } from "#/route";

import { PageLayout } from "./constant";

const Charts: AppRouteRecordRaw = {
  path: "/charts",
  name: "Charts",
  redirect: "/charts/line",
  meta: {
    title: "chart.title",
    icon: "charts",
  },
  component: PageLayout,
  children: [
    {
      path: "line",
      name: "Line",
      meta: {
        title: "chart.line",
        isAffix: true,
      },
      component: () => import("@/views/charts/line/index.vue"),
    },
    {
      path: "three",
      name: "ThreeD",
      meta: {
        title: "chart.three",
      },
      component: () => import("@/views/charts/three/index.vue"),
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
