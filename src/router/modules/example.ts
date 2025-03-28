/*
 * @Author: Komorebi
 * @Date: 2025-01-10 11:20:50
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-03-28 11:01:01
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
      path: "comp",
      name: "ExampleComp",
      meta: {
        title: "example.components.title",
      },
      children: [
        {
          path: "dialog",
          name: "CompDialog",
          meta: {
            title: "example.components.dialog",
          },
          component: () => import("@/views/example/comp/dialog/index.vue"),
        },
        {
          path: "editor",
          name: "CompEditor",
          meta: {
            title: "example.components.editor",
          },
          component: () => import("@/views/example/comp/editor/index.vue"),
        },
      ],
    },
  ],
};

export default Example;
