/*
 * @Author: Komorebi
 * @Date: 2024-09-26 09:37:47
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-02 15:22:43
 */
import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
} from "vue-router";
import type { TabPane } from "#/route";

import i18n from "@/locales";
import { defineStore } from "pinia";
import { LanguageEnum, DeviceEnum } from "@/enums/app";
import { getRawRoute } from "@/utils/route";
import { useI18n } from "@/hooks/useI18n";

/**
 * 路由跳转前剔除其余无相关的参数
 * 只保留需要的参数
 */
const getToTarget = (tabItem: RouteLocationNormalized) => {
  const { params, path, query } = tabItem;
  return {
    params: params || {},
    path,
    query: query || {},
  };
};
/**
 * 判断当前是否处于暗黑模式
 * auto: 暗黑模式
 * light: 白天模式
 */
let isDarkTheme = localStorage.getItem("vueuse-color-scheme") === "auto";

const useAppSet = defineStore("appSet", {
  // 官方推荐使用 完整类型推断的箭头函数
  state: () => ({
    lang: LanguageEnum.CHINESE,
    // 是否收起侧边导航栏(仅左侧菜单模式, 移动端)
    isCollapse: false,
    /**
     * Set 和 Map 的选用
     * Set: 不会出现详情这种
     * Map: A?a=1 和 A?a=2 类似某条数据的详情
     */
    cacheTabList: new Set() as Set<string>,
    tabList: [] as RouteLocationNormalized[],
    isDarkTheme,
    // 设备类型
    device: DeviceEnum.PC,
  }),

  getters: {
    /**
     * 专门为 keep-alive 中的 includes 设置的值
     */
    getCacheTabList(): string[] {
      let cacheList = [...this.cacheTabList];
      // console.log("🚀 ~ getCacheTabList ~ cacheList:", cacheList);
      return cacheList;
    },
    // 判断当前设备是否为PC
    isPC(): boolean {
      return this.device === DeviceEnum.PC;
    },
    /** 
     * 专门为页面顶部的路由缓存导航设置的值
     */
    getTabPaneList(): TabPane[] {
      let list = this.tabList.map(item => ({
        title: useI18n(item.meta.title, "Route"),
        name: item.name as string,
        isAffix: !item.meta.isAffix,
      }))
      return list;
    },
  },

  actions: {
    // 切换语言
    setLang(lang: LanguageEnum) {
      this.lang = lang;
      i18n.global.locale.value = lang;
    },
    // 展开与收起侧边菜单栏 
    setIsCollapse(flag?: boolean) {
      if (typeof flag === 'boolean') {
        this.isCollapse = flag;
        return;
      }
      this.isCollapse = !this.isCollapse;
    },
    // 切换主题
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    },
    // 设置设备类型
    setDevice(device: DeviceEnum) {
      this.device = device;
    },

    // 添加路由
    addTab(route: RouteLocationNormalized) {
      const { path, name, fullPath, params, query, meta } = getRawRoute(route);
      /**
       *  排除:
       *  路由名称为空的页面
       *  错误页面、登录、重定向的页面
       *  不存在路由的页面
       */
      if (!name || meta.hidden || meta.ignoreKeepAlive) return;
      // 记录已存在的标签页在tabList数组中的索引, 默认值为 -1
      let updateIndex = -1;
      // 不重复添加已有的路由页面
      const tabHasExit = this.tabList.some((item, index) => {
        updateIndex = index;
        /**
         * 判断当前元素的 fullPath 或 path
         * 是否与给定的 fullPath 或 path 相等
         * 相等返回true, 表示已存在相同的页面
         */
        return (item.fullPath || item.path) === (fullPath || path);
      });
      // 如果路由页面已存在,更新标签页的参数、查询和完整路径
      if (tabHasExit) {
        /**
         * toRaw() 可以返回
         * reactive()、readonly()、shallowReactive() 或者 shallowReadonly()
         * 创建的代理对应的原始对象。
         *
         * const foo = {};
         * const reactiveFoo = reactive(foo);
         * toRaw(reactiveFoo) === foo; // true
         *
         * 这是一个可以用于临时读取而不引起代理访问/跟踪开销，
         * 或是写入而不触发更改的特殊方法。
         * 不建议保存对原始对象的持久引用，请谨慎使用
         */
        const currTab = toRaw(this.tabList)[updateIndex];
        if (!currTab) return;
        // 更新当前路由信息
        // 显示到url上的参数
        currTab.params = params || currTab.params;
        // 不显示在url上, 刷新会丢失
        currTab.query = query || currTab.query;
        // 包括 search 和 hash 在内的完整地址
        currTab.fullPath = fullPath || currTab.fullPath;
        this.tabList.splice(updateIndex, 1, currTab);
      } else {
        this.tabList.push(route);
      }
      // 更新缓存的选项卡
      this.updateCacheTab();
      // 存储到sessionStorage?
    },
    // 根据当前打开的选项卡更新缓存
    updateCacheTab() {
      const cacheMap: Set<string> = new Set();
      for (const tab of this.tabList) {
        const item = getRawRoute(tab);
        if (item.meta.ignoreKeepAlive) continue;
        const name = item.name as string;
        cacheMap.add(name);
      }
      this.cacheTabList = cacheMap;
    },
    // 关闭路由
    async closeTab(tab: RouteLocationNormalized, router: Router) {
      // 关闭函数
      const close = (route: RouteLocationNormalized) => {
        const { fullPath, meta: { isAffix } = {} } = route;
        if (isAffix) return;
        const _index = this.tabList.findIndex(
          (item) => item.fullPath === fullPath
        );
        _index !== -1 && this.tabList.splice(_index, 1);
        // 更新缓存的选项卡
        this.updateCacheTab();
      };
      // 获取当前路由相关
      const { currentRoute, replace } = router;
      /**
       * unref()
       * 如果参数是ref, 则返回内部值, 否则返回参数本身
       * val = isRef(val) ? val.value : val;
       */
      const { path } = unref(currentRoute);
      // *如果关闭的路由不是当前活动的路由
      if (tab.path !== path) {
        // 直接关闭
        close(tab);
        return;
      }
      // *关闭的是当前活动的路由
      let toTarget: RouteLocationRaw = {};
      const index = this.tabList.findIndex((item) => item.path === path);
      // 如果关闭的是最左边的路由
      if (index === 0) {
        // 只有一个选项卡，然后跳到主页，否则跳到右侧选项卡
        if (this.tabList.length === 1) {
          // * 主页暂定是这个
          toTarget = "/";
        } else {
          // 跳到右侧的选项卡
          const page = this.tabList[index + 1];
          toTarget = getToTarget(page);
        }
      } else {
        // 跳到左侧的选项卡
        const page = this.tabList[index - 1];
        toTarget = getToTarget(page);
      }
      // 关闭当前选项卡
      close(currentRoute.value);
      await replace(toTarget);
    },
  },

  // 安装了 pinia-plugin-persistedstate 插件,才能使用该配置
  persist: {
    storage: sessionStorage,
    /* 排除 */
    omit: ["cacheTabList", "isDarkTheme", "device"],
    /* 挑选 */
    // pick: [],
    /**
     * 序列化 / 反序列化
     * 默认使用 JSON.stringify / destr
     * (destr) https://github.com/unjs/destr
     */
    // serializer: {
    //   // 解密
    //   deserialize: parse,
    //   // 加密
    //   serialize: stringify,
    // },
  },
});

export default useAppSet;
