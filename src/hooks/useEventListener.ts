/*
 * @Author: Komorebi
 * @Date: 2024-12-24 15:56:16
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-19 15:40:50
 */
/**
 * 这个函数的主要作用是为指定的元素添加事件监听器，
 * 并在需要时自动移除监听器。
 * 它支持防抖和节流功能，
 * 并且可以通过返回的 removeEvent 方法手动移除监听器。
 */
import type { Ref } from "vue";

import { useThrottleFn, useDebounceFn } from "@vueuse/core";

// 定义一个类型 RemoveEventFn，表示一个无参数无返回值的函数类型
export type RemoveEventFn = () => void;

export interface UseEventParams<T extends Event = Event> {
  // 事件绑定的元素，可以是 Element、Ref 或 Window
  el?: Element | Ref<Element | undefined> | Window | any;
  // 事件名称
  name: string;
  // 事件监听器
  listener: (e: T) => void;
  // 事件监听选项
  options?: boolean | AddEventListenerOptions;
  // 是否自动移除事件监听器
  autoRemove?: boolean;
  // 是否使用防抖
  isDebounce?: boolean;
  // 防抖或节流的等待时间
  wait?: number;
}

export function useEventListener<T extends Event = Event>({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80,
}: UseEventParams<T>): { removeEvent: RemoveEventFn } {
  // 初始化 remove 函数为空函数
  let remove: RemoveEventFn = () => {};
  // 用于跟踪事件监听器是否已添加
  const isAddRef = ref(false);

  if (el) {
    // 将 el 转换为 Ref<Element>
    const element = ref(el as Element) as Ref<Element>;
    // 根据 isDebounce 决定使用防抖函数还是节流函数
    const handler = isDebounce
      ? useDebounceFn(listener as unknown as EventListener, wait)
      : useThrottleFn(listener as unknown as EventListener, wait);
    // 如果有等待时间，则使用处理后的函数，否则使用原始监听器
    const realHandler = wait ? handler : (listener as unknown as EventListener);

    // 定义移除事件监听器的函数
    const removeEventListener = (e: Element) => {
      if (isAddRef.value) {
        // 移除事件监听器
        e.removeEventListener(name, realHandler, options);
        isAddRef.value = false;
      }
    };

    // 定义添加事件监听器的函数
    const addEventListener = (e: Element) => {
      if (!isAddRef.value) {
        e.addEventListener(name, realHandler, options);
        isAddRef.value = true;
      }
    };
    // 监听 element 的变化
    const removeWatch = watch(
      element,
      (newVal, _oldVal, cleanUp) => {
        if (newVal) {
          // 如果事件监听器未添加，则添加
          !unref(isAddRef) && addEventListener(newVal);
          cleanUp(() => {
            // 清理时自动移除事件监听器
            autoRemove && removeEventListener(newVal);
          });
        }
      },
      { immediate: true } // 立即执行监听器
    );

    // 定义 remove 函数，移除事件监听器并停止监听 element 的变化
    remove = () => {
      removeEventListener(element.value);
      removeWatch();
    };
  }
  return {
    removeEvent: remove,
  };
}
