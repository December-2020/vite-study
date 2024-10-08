// import type {
//   RouteLocationNormalized,
//   RouteLocationRaw,
//   Router,
// } from "vue-router";

import i18n from "@/locales";
import { defineStore } from "pinia";
// import { getRawRoute } from "@/utils/route";
import { LanguageEnum, ThemeEnum } from "@/enums/app";

const useAppSet = defineStore("appSet", {
  // 官方推荐使用 完整类型推断的箭头函数
  state: () => ({
    lang: LanguageEnum.CHINESE,
    theme: ThemeEnum.DARK,
  }),

  actions: {
    // 切换语言
    setLang(lang: LanguageEnum) {
      this.lang = lang;
      i18n.global.locale.value = lang;
    },
  },
});

export default useAppSet;
