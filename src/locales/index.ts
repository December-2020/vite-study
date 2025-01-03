/*
 * @Author: Komorebi
 * @Date: 2024-09-26 09:14:14
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-03 14:53:58
 */
import type { App } from "vue";

// 引入自定义的语言包
import enLocale from "./modules/en-US";
import zhLocale from "./modules/zh-CN";
// 引入vue-i18n组件
import { createI18n } from "vue-i18n";
// 引入语言包的枚举类型
import { LanguageEnum } from "@/enums/app";

// 默认语言为中文
let language = LanguageEnum.CHINESE;
// 获取缓存的语言设置
const AppSet = sessionStorage.getItem("appSet");
if (AppSet) {
  let { lang } = JSON.parse(AppSet);
  language = lang;
}

// 合并语言包
const messages = {
  [LanguageEnum.ENGLISH]: enLocale,
  [LanguageEnum.CHINESE]: zhLocale,
};

// 注册i18n并引入语言包
const i18n = createI18n({
  // 如果想在composition api中使用,需要设置为false
  legacy: false,
  // 如果设置为true, $t() 函数将注册到全局作用域,并且可以在模板中使用
  globalInjection: true,
  // 设置默认语言
  locale: language,
  // 不存在则默认为中文
  fallbackLocale: LanguageEnum.CHINESE,
  messages,
});

export default i18n;

export const registerI18n = (app: App) => {
  app.use(i18n);
};
