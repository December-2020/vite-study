/*
 * @Author: Komorebi
 * @Date: 2024-09-26 09:36:22
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-26 10:38:19
 */
import type { App } from "vue";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import appSet from "./modules/appSet";
import user from "./modules/user";
import permission from "./modules/permission";

// 使用pinia
import { createPinia } from "pinia";

interface IAppStore {
  appSet: ReturnType<typeof appSet>;
  user: ReturnType<typeof user>;
  permission: ReturnType<typeof permission>;
}
const appStore: IAppStore = {} as IAppStore;

export default appStore;

export const registerStore = (app: App) => {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
  appStore.appSet = appSet();
  appStore.user = user();
  appStore.permission = permission();
};
