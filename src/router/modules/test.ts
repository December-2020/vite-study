import type { AppRouteRecordRaw } from "#/route";

import { LeftLayout } from "./constant";

const Test: AppRouteRecordRaw = {
  path: "/test",
  name: "Test-2",
  redirect: "/test/test2",
  meta: {
    title: "chart.test",
    icon: "charts",
  },
  component: LeftLayout,
  children: [
    {
      path: "test2",
      name: "Test-2",
      meta: {
        title: "chart.test2",
      },
      component: () => import("@/views/test/index2.vue"),
    },
  ],
};

export default Test;
