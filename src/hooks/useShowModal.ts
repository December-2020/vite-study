/*
 * @Author: Komorebi
 * @Date: 2025-02-10 11:20:18
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-12 15:42:09
 */
type ModalController<T = any, P = any> = {
  visible: Ref<boolean>;
  open: (payload?: T) => Promise<P>;
  close: (result?: P) => void;
};

export function useShowModal<T = any, P = any>(): ModalController<T, P> {
  const visible = ref(false);
  let resolvePromise: ((value: P | PromiseLike<P>) => void) | null = null;
  let payload: T | undefined;

  const open = (openPayload?: T): Promise<P> => {
    visible.value = true;
    payload = openPayload;
    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  };

  const close = (result?: P) => {
    visible.value = false;
    if (resolvePromise) {
      resolvePromise(result as P);
      resolvePromise = null;
    }
    payload = undefined;
  };

  return {
    visible,
    open,
    close,
  };
}

// 类型增强接口
export interface UseShowModal<T, P> {
  visible: Ref<boolean>;
  open: (payload?: T) => Promise<P>;
  close: (result?: P) => void;
}
