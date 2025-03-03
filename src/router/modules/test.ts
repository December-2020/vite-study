/*
 * @Author: Komorebi
 * @Date: 2024-10-19 14:28:03
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-03-01 13:59:48
 */
import type { AppRouteRecordRaw } from "#/route";

import { PageLayout } from "./constant";

const Test: AppRouteRecordRaw = {
  path: "/test",
  name: "Test-2",
  redirect: "/test/test2",
  meta: {
    title: "chart.test",
    icon: "charts",
  },
  component: PageLayout,
  children: [
    {
      path: "test2",
      name: "Test-2_2",
      meta: {
        title: "chart.test2",
      },
      component: () => import("@/views/test/index2.vue"),
    },
  ],
};

export default Test;
