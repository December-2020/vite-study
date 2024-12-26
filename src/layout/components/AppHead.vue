<!--
 * @Author: Komorebi
 * @Date: 2024-10-14 11:31:48
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-12-26 11:03:31
-->
<template>
  <div class="wrapper flex justify-between items-center h-100%">
    <!-- 左侧菜单功能 -->
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
              <!-- ref="breadRefList" -->
              <span>{{ item.title }}</span>
            </BaseDropdown>
          </template>
          <template v-else>{{ item.title }}</template>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧用户头像等信息 -->
    <div class="wrapper-rt flex items-center">
      <!-- 仅 pc 显示 -->
      <template v-if="store.appSet.isPC">
        <!-- 搜索icon -->
        <div class="m-r-10px p-6px cursor-pointer">
          <SvgIcon icon-class="common-search" />
        </div>
        <!-- 全屏 -->
        <ElTooltip placement="bottom" :content="fullScreen.tip">
          <div class="m-r-10px p-6px cursor-pointer" @click="toggleFullScreen">
            <SvgIcon :icon-class="fullScreen.svg" />
          </div>
        </ElTooltip>
        <!-- 主题切换 -->
        <ThemeSwitch class="m-r-10px" />
        <!-- 国际化 -->
        <LangDropdown />
      </template>
      <!-- 用户头像 -->
      <BaseDropdown :options="operationList" @command="operationCommand">
        <div class="user flex items-center m-l-10px">
          <el-avatar :size="24" :src="UserPhoto" />
          <span class="inline-block m-l-8px font-size-14px">
            {{ username }}
          </span>
        </div>
      </BaseDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownItemProps } from "@/components/composition/BaseDropdown.vue";

import store from "@/store";
import UserPhoto from "@/assets/images/user_photo.gif";
import { ElMessage } from "element-plus";
import { useFullscreen } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useI18n } from "@/hooks/useI18n";
import { storeToRefs } from "pinia";

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
let menuSvg = computed(() => {
  /** 
   * 将为任何响应式属性创建 refs。 
   * 当您仅使用 store 中的状态但不调用任何操作时，这很有用
   */
  const { isCollapse } = storeToRefs(store.appSet);
  return `common-menu-${isCollapse ? "expand" : "collapse"}`;
});
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
// const breadRefList = ref([]);
// 面包屑路由跳转
const handleBreadGo = (routeName: string) => {
  // console.log("🚀 ~ breadRefList:", breadRefList);
  /**
   * ! dropdown-item 动态更新的bug
   * 详情见: https://github.com/element-plus/element-plus/issues/16639
   * 有点类似, 但实际并不相同
   * 方案一: 用 setTimeout 执行 handleClose
   * 方案二: 改用 popover 组件
   */
  router.push({ name: routeName });
  // let _list = breadRefList.value;
  // if (_list && _list.length) {
  //   _list.forEach((item) => {
  //     console.log(1111, { item });
  //     setTimeout(() => {
  //       item.handleClose();
  //     }, 100);
  //   });
  // }
};

// @ts-ignore 用户名称
let username = store.user.userInfo.name || "Admin";
// 用户操作(用户头像下的)
const operationList = [{ label: "退出系统", command: "logout" }];
const operationCommand = (command: string) => {
  switch (command) {
    case "logout": {
      store.user.logout();
      /**
       * *清空路由记录栈
       */
      // 路由回退到最开始的路由
      router.replace({ name: "Login" });
      break;
    }
    default: {
      console.log("🚀 ~ command:", command);
    }
  }
};

// 全屏切换
const { isFullscreen, isSupported, toggle } = useFullscreen();
const fullScreen = computed(() => {
  let _val = isFullscreen.value;
  let svg = `common-fullscreen${_val ? "-exit" : ""}`;
  let tip = `${_val ? useI18n(`ToolTip.exit`) : ""}${useI18n(
    `ToolTip.fullScreen`
  )}`;
  return { svg, tip };
});
const toggleFullScreen = async () => {
  if (isSupported.value) {
    /**
     * !在f12下是不会全屏的
     */
    toggle();
    return;
  }
  ElMessage({
    type: "error",
    message: useI18n(`ToolTip.noSupportFullScreen`),
  });
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
