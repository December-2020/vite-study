/*
 * @Author: Komorebi
 * @Date: 2025-01-10 11:20:50
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-15 14:03:39
 */
import type { AppRouteRecordRaw } from "#/route";

import { PageLayout } from "./constant";

const Example: AppRouteRecordRaw = {
  path: "/example",
  name: "Example",
  redirect: "/example/ellipsis",
  meta: {
    title: "example.title",
    icon: "example",
  },
  component: PageLayout,
  children: [
    {
      path: "ellipsis",
      name: "TextEllipsis",
      meta: {
        title: "example.ellipsis",
      },
      component: () => import("@/views/example/ellipsis/index.vue"),
    },
    {
      path: "frame",
      name: "FrameExample",
      meta: {
        title: "example.frame",
      },
      component: () => import("@/views/example/frame/index.vue"),
    },
  ],
};

export default Example;
