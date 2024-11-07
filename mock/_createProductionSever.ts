/*
 * @Author: Komorebi
 * @Date: 2024-11-07 15:45:18
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-07 16:34:34
 */
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

// @ts-ignore
const modules = import.meta.glob("./**/*.ts", { eager: true });

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes("/_")) {
    return;
  }
  // @ts-ignore
  mockModules.push(...modules[key].default);
});

/**
 * 用于生产环境。需要手动导入所有模块
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
