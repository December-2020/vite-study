<!--
 * @Author: Komorebi
 * @Date: 2024-10-14 11:31:48
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-19 17:11:54
-->
<template>
  <div class="wrapper flex justify-between items-center h-100%">
    <div class="wrapper-lt flex">
      <!-- 收起菜单的svg -->
      <div class="icon" v-if="props.showCollapse" @click="toggleCollapse">
        <SvgIcon :icon-class="menuSvg" class-name="text-4" />
      </div>
      <!-- 面包屑导航栏 -->
      <el-breadcrumb separator="/" class="flex items-center p-l-10px">
        <el-breadcrumb-item v-for="item in routeList" :key="item.path">
          <template v-if="item.childList.length">
            <BaseDropdown :options="item.childList" @command="handleBreadGo">
              <div>{{ item.title }}</div>
            </BaseDropdown>
          </template>
          <template v-else>{{ item.title }}</template>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="wrapper-rt">
      <theme-switch class="m-r-10px" />
      <lang-dropdown />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownItemProps } from "@/components/composition/BaseDropdown.vue";
import store from "@/store";
import { useRouter } from "vue-router";
import { useI18n } from "@/hooks/useI18n";

interface Props {
  // 是否显示 收起菜单的svg
  showCollapse?: boolean;
}
// 面包屑路由的类型
interface RouteType {
  path: string;
  title: string;
  childList: DropdownItemProps[];
}

const props = withDefaults(defineProps<Props>(), {
  showCollapse: false,
});

// 左侧导航栏展开与收起
let menuSvg = computed(
  () => `common-menu-${store.appSet.isCollapse ? "expand" : "collapse"}`
);
const toggleCollapse = store.appSet.setIsCollapse;

// 面包屑路由
// 获取路由列表
const router = useRouter();
/**
 * 监听路由的变化
 * Q: 为什么不用computed?
 * A: 需要第一时间监听路由的变化
 * Q: watch 和 watchEffect 如何选择
 * A: 它们两者主要功能相同，区别只是追踪响应式依赖的方式不同
 *    1、watch 只追踪明确定义的数据源，可以侦听数据的新值和旧值
 *      用法：只监听特定属性、需要手动停止监听等
 *    2、watchEffect 会初始化执行一次，在副作用发生期间期间追踪依赖
 *      自动分析出侦听数据源
 *      用法：执行 异步操作 或 更新UI
 */
// watch(
//   () => router.currentRoute.value,
//   (newVal) => {
//     // 当前路由的name
//     //  let currRouteName = newVal.name;
//     const { name: currRouteName, matched: matchList } = newVal;
//     // let list
//     console.log({ currRouteName, matchList, watch: true });
//   },
//   { immediate: true }
// );
const routeList = ref<RouteType[]>([]);
watchEffect(() => {
  const { name: currRouteName, matched: matchList } = router.currentRoute.value;
  let list = matchList.map((item) => {
    let childList = item.children.flatMap((child) =>
      child.name !== currRouteName && !child.children?.length
        ? [
            {
              ...child,
              key: child.name,
              command: child.name,
              label: useI18n(child.meta?.title, "Route"),
            },
          ]
        : []
    );
    return {
      path: item.path,
      title: useI18n(item.meta.title, "Route"),
      childList,
    };
  });
  // console.log(list, "list ~~~");
  routeList.value = list as RouteType[];
});
// 面包屑路由跳转
const handleBreadGo = (routeName: string) => {
  /**
   * ! dropdown-item 动态更新的bug
   * 详情见: https://github.com/element-plus/element-plus/issues/7603
   */
  router.push({ name: routeName });
};
</script>

<style scoped lang="scss">
.wrapper {
  &-lt {
    .icon {
      padding: 14px 10px;
      cursor: pointer;
      @include font_color("content-font-color");
    }
  }
}
</style>
