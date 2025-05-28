/*
 * @Author: Komorebi
 * @Date: 2024-09-27 10:42:42
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-18 11:52:20
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

/**
 * * 去除readonly
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 *  T | null 包装
 */
export type Nullable<T> = T | null;

/** 
 * 定义对象
 */
export type AnyObject = Record<string, any>;


/** 
 * 任意类型的异步函数
 * 
 * PromiseLike 只有then
 * Promise 包含所有
 */
export type AnyAsyncFunction = (...args: any[]) => PromiseLike<any>;
/** 
 * 任意类型的普通函数
 */
export type AnyFunction = (...args: any[]) => any;
/** 
 * 任意类型的函数
 */
export type AnyFunctionType = AnyAsyncFunction | AnyFunction;
