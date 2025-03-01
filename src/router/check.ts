/**
 * 检测 name 是否重复的方法
 */
import type { AppRouteRecordRaw } from "#/route";

/**
 * 一般是检测静态路由
 *
 * 其实也可以检测动态路由
 * 获取到动态路由后，再调用此方法检测
 * 通过后再调用 router.addRoute 添加动态路由
 */
export const checkDuplicateRouteNames = (
  routeList: AppRouteRecordRaw[],
  existNames = new Set()
) => {
  routeList.forEach((route) => {
    if (route.name) {
      if (existNames.has(route.name)) {
        console.warn(`[Vue Router] 路由 name 重复: "${route.name}"`);
        // throw new Error(`[Vue Router] 路由 name 重复: "${route.name}"`);
        return true;
      } else {
        existNames.add(route.name);
      }
    }
    if (route.children && route.children.length) {
      checkDuplicateRouteNames(route.children, existNames);
    }
  });
  return false;
};
