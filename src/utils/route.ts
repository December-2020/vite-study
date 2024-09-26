import type {
  RouteLocationNormalized,
  RouteRecordNormalized,
} from "vue-router";

/**
 * 获取给定路由对象的原始路由信息
 * 并返回一个包含原始路由信息的新对象
 * @param {RouteLocationNormalized} route 当前路由信息
 * @return {RouteLocationNormalized} false 非空对象
 */
export const getRawRoute = (
  route: RouteLocationNormalized
): RouteLocationNormalized => {
  if (!route) return route;
  // 剥离matched属性
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
};
