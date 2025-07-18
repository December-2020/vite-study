/*
 * @Author: Komorebi
 * @Date: 2025-04-07 14:53:58
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-18 11:53:15
 */
import type { AppRouteRecordRaw } from "#/route";

import { PageLayout } from "./constant";

const Comp: AppRouteRecordRaw = {
  path: "/comp",
  name: "Comp",
  redirect: "/example/ellipsis",
  meta: {
    title: "components.title",
    icon: "components",
  },
  component: PageLayout,
  children: [
    {
      path: "dialog",
      name: "CompDialog",
      meta: {
        title: "components.dialog",
      },
      component: () => import("@/views/comp/dialog/index.vue"),
    },
    {
      path: "editor",
      name: "CompEditor",
      meta: {
        title: "components.editor",
      },
      component: () => import("@/views/comp/editor/index.vue"),
    },
    {
      path: "screenshot",
      name: "CompScreenshot",
      meta: {
        title: "components.screenshot",
      },
      component: () => import("@/views/comp/screenshot/index.vue"),
    },
  ],
};

export default Comp;
