/*
 * @Author: Komorebi
 * @Date: 2024-09-26 09:36:22
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-26 10:38:19
 */
import type { App } from "vue";

import appSet from "./modules/appSet";

// 使用pinia
import { createPinia } from "pinia";

interface IAppStore {
  appSet: ReturnType<typeof appSet>;
}
const appStore: IAppStore = {} as IAppStore;

export default appStore;

export const registerStore = (app: App) => {
  const pinia = createPinia();
  app.use(pinia);
  appStore.appSet = appSet();
};
