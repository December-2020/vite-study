/*
 * @Author: Komorebi
 * @Date: 2024-12-24 15:46:13
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-03-04 15:20:37
 */
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
