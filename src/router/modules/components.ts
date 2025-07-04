/*
 * @Author: Komorebi
 * @Date: 2025-04-07 14:53:58
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-04 13:56:19
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
      children: [
        {
          path: "html2canvas",
          name: "CompScreenshot-1",
          meta: {
            title: "components.html2canvas",
          },
          component: () =>
            import("@/views/comp/screenshot/html2canvas/index.vue"),
        },
        {
          path: "snapDom",
          name: "CompScreenshot-2",
          meta: {
            title: "components.snapDom",
          },
          component: () =>
            import("@/views/comp/screenshot/snapDom/index.vue"),
        },
      ],
    },
  ],
};

export default Comp;
