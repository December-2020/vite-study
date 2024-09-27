/*
 * @Author: Komorebi
 * @Date: 2024-09-27 10:42:42
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-27 10:54:55
 */
import type { PropType } from "vue";

export const definePropType = <T>(val: any): PropType => val;

/**
 * npm 下载的"包"自带了类型声明文件,
 * 如果我们需要对其类型声明进行扩展,
 * 就可以使用 "declare module" 语法来扩展
 */
// 定义一个对象的键和值
declare type Recordable<T = any> = Record<string, T>;