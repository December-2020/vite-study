/*
 * @Author: Komorebi
 * @Date: 2024-09-26 09:37:47
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-14 16:52:37
 */
// import type {
//   RouteLocationNormalized,
//   RouteLocationRaw,
//   Router,
// } from "vue-router";

import i18n from "@/locales";
import { defineStore } from "pinia";
// import { getRawRoute } from "@/utils/route";
import { LanguageEnum } from "@/enums/app";

const useAppSet = defineStore("appSet", {
  // 官方推荐使用 完整类型推断的箭头函数
  state: () => ({
    lang: LanguageEnum.CHINESE,
    // 是否收起侧边导航栏(仅左侧菜单模式)
    isCollapse: false,
  }),

  getters: {
    // getIsCollapse(): boolean {
    //   return this.isCollapse;
    // },
  },

  actions: {
    // 切换语言
    setLang(lang: LanguageEnum) {
      this.lang = lang;
      i18n.global.locale.value = lang;
    },
    // 展开与收起侧边菜单栏
    setIsCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});

export default useAppSet;
