/*
 * @Author: Komorebi
 * @Date: 2025-02-10 11:20:18
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-18 10:53:02
 */
// 类型增强接口
// export interface UseShowModal<T = any, P = any> {
//   visible: Ref<boolean>;
//   open: (payload?: T) => Promise<P>;
//   close: (result?: P) => void;
// }

// export function useShowModal<T = any, P = any>(): UseShowModal<T, P> {
//   const visible = ref(false);
//   let resolvePromise: ((value: P | PromiseLike<P>) => void) | null = null;
//   let payload: T | undefined;

//   const open = (openPayload?: T): Promise<P> => {
//     visible.value = true;
//     payload = openPayload;
//     return new Promise((resolve) => {
//       resolvePromise = resolve;
//     });
//   };

//   const close = (result?: P) => {
//     visible.value = false;
//     if (resolvePromise) {
//       resolvePromise(result as P);
//       resolvePromise = null;
//     }
//     payload = undefined;
//   };

//   return {
//     visible,
//     open,
//     close,
//   };
// }
import { tryOnUnmounted } from '@vueuse/core';
