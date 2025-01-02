/*
 * @Author: Komorebi
 * @Date: 2024-09-27 10:55:52
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-15 09:50:56
 */
import type { RouteRecordRaw, RouteMeta } from "vue-router";
import type { Recordable } from "#/global";

// 扩展路由元信息
declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    icon?: string;
    // 菜单栏中是否显示, 默认为 false, 即菜单栏中显示该路由
    hidden?: boolean;
    // 是否不缓存路由, 默认都缓存
    ignoreKeepAlive?: boolean;
    /**
     * 缓存的路由是否固定, 默认为 false
     * 如果为true, 则默认 ignoreKeepAlive 为 false
     */
    isAffix?: boolean;
  }
}

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

/**
 * Omit 删除指定类型的key 返回删除后的类型
 * 原始路由记录
 *
 * 第一个 Omit
 *    RouteRecordRaw 剔除掉 meta
 * 第二个 Omit (ts报错)
 *    在第一个的基础上 再剔除 children
 *
 * 在路由无匹配时(例如: 404),
 * 是不需要name和meta的
 */
export interface AppRouteRecordRaw
  extends Omit<Omit<RouteRecordRaw, "meta">, "children"> {
  path: string;
  name?: string;
  meta: RouteMeta;
  component?: Component | string;
  // 一个页面可能有多个子页面
  components?: Component;
  children?: AppRouteRecordRaw[];
  // 当 props 设置为 true 时，route.params 将被设置为组件的 props
  props?: Recordable | boolean;
  // 包括 search 和 hash 在内的完整地址
  fullPath?: string;
  redirect?: string;
}


/** 
 * 专门为页面顶部的路由缓存导航所设计的类型
 */
export interface TabPane {
  title?: string;
  name?: string;
  isAffix?: boolean;
}
