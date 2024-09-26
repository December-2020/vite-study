import type { App } from "vue";

// 引入自定义的语言包
import enLocale from "./modules/en-US";
import zhLocale from "./modules/zh-CN";
// 引入vue-i18n组件
import { createI18n } from "vue-i18n";
// 引入语言包的枚举类型
import { LanguageEnum } from "@/enums/app";

// 合并语言包
const messages = {
  [LanguageEnum.ENGLISH]: enLocale,
  [LanguageEnum.CHINESE]: zhLocale,
};

// 自动引入会在使用的过程中报t实例化过深
// 引入同级目录下的语言包
// const modules = import.meta.glob("./modules/*.ts", { eager: true });
// const messages = getLangFiles(modules);

// // 格式 文件名:{文件内容}
// function getLangFiles(mList: any) {
//   let msg: any = {};
//   for (let path in mList) {
//     if (mList[path].default) {
//       // 文件名称
//       let pathName = path.slice(path.lastIndexOf("/") + 1, -3);
//       if (msg[pathName]) {
//         msg[pathName] = {
//           ...mList[pathName],
//           ...mList[path].default,
//         };
//       } else {
//         msg[pathName] = mList[path].default;
//       }
//     }
//   }
//   return msg;
// }

// 注册i18n并引入语言包
const i18n = createI18n({
  // 如果想在composition api中使用,需要设置为false
  legacy: false,
  // 如果设置为true, $t() 函数将注册到全局作用域,并且可以在模板中使用
  globalInjection: true,
  // 设置默认语言
  locale: LanguageEnum.CHINESE,
  // 不存在则默认为中文
  fallbackLocale: LanguageEnum.CHINESE,
  messages,
});

export default i18n;

export const registerI18n = (app: App) => {
  app.use(i18n);
};
