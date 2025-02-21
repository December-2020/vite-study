/*
 * @Author: Komorebi
 * @Date: 2025-02-10 11:20:18
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-21 16:33:49
 */
import type { Nullable } from "#/global";
import type {
  UseModalReturnType,
  ModalMethods,
  ReturnMethods,
  ModalProps,
  UseModalInnerReturnType,
  ReturnInnerMethods,
} from "#/modal";

import { isEqual } from "lodash";
import { tryOnUnmounted } from "@vueuse/core";
import { isFunction } from "@/utils/is";

/** 
 * 创建一个响应式对象, 用于在不同组件之间传递数据
 * 所有弹窗的数据传递都会通过 dataTransfer 对象进行
 * 键为模态框的唯一标识符(uid),
 */
const dataTransfer = reactive<any>({});
/**
 * 用于存储每个弹窗的打开状态,
 * 键为模态框的唯一标识符(uid),
 * 值为布尔值, 表示模态框的打开状态
 */
const openData = reactive<{ [key: number]: boolean }>({});

/**
 * @description: 适用于独立模式和外部通话
 */
export function useModal(): UseModalReturnType {
  // 模态框方法实例
  const modal = ref<Nullable<ModalMethods>>(null);
  // 模态框是否已加载
  const loaded = ref<Nullable<boolean>>(false);
  // 模态框唯一标识符
  const uid = ref<number>(0);

  // 注册模态框实例,
  const register = (modalMethod: ModalMethods, uuid: number) => {
    if (!getCurrentInstance()) {
      throw new Error("检查useModal是否在 setup 函数或函数式组件内部调用");
    }
    uid.value = uuid;
    // console.log("🚀 ~ register ~ uid.value:", uid.value);
    // 组件卸载时执行
    tryOnUnmounted(() => {
      modal.value = null;
      loaded.value = false;
      dataTransfer[String(unref(uid))] = null;
      // console.log("🚀 ~ 组件卸载 ~ uid.value:", uid.value);
    });
    // 如果模态框已加载,且传入的模态框实例与当前存储的实例相同,则直接返回
    if (unref(loaded) && modalMethod === unref(modal)) return;
    modal.value = modalMethod;
    // 否则，将传入的模态框实例赋值给 modal，并将 loaded 标记为 true
    loaded.value = true;
    // 为模态框实例添加 emitOpen 方法，用于更新 openData 中对应 uid 的打开状态
    modalMethod.emitOpen = (open: boolean, uid: number) => {
      openData[uid] = open;
    };
  };

  // 获取当前实例
  const getInstance = () => {
    const instance = unref(modal);
    if (!instance) {
      console.error("useModal的实例未定义!");
    }
    return instance;
  };

  const methods: ReturnMethods = {
    setModalProps: (props: ModalProps): void => {
      getInstance()?.setModalProps(props);
    },
    // 获取模态框的打开状态
    // getOpen: computed((): boolean => {
    //   return openData[~~unref(uid)];
    // }),
    /**
     * 用于打开模态框, 并可传递数据
     * 如果 openOnSet 为 true, 则直接更新 dataTransfer
     * 否则, 先比较数据是否相等, 不相等时再更新
     */
    openModal: <T = any>(
      modelValue = true,
      data?: T,
      openOnSet = true
    ): void => {
      // console.log("🚀 ~ useModal ~ openModal:", { modelValue, data });
      getInstance()?.setModalProps({ modelValue });
      if (!data) return;
      const id = unref(uid);
      if (openOnSet) {
        dataTransfer[id] = null;
        /**
         * toRaw() 可以返回由
         * reactive()、readonly()、shallowReactive()或者shallowReadOnly
         * 创建的代理对应的原始对象
         */
        dataTransfer[id] = toRaw(data);
        return;
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data));
      if (!equal) {
        dataTransfer[id] = toRaw(data);
      }
    },
    closeModal: () => {
      // console.log("🚀 ~ useModal ~ closeModal:");
      getInstance()?.setModalProps({ modelValue: false });
    },
  };
  return [register, methods];
}

/**
 * @description: 用于在模态框内部使用
 */
export const useModalInner = (callbackFn?: Fn): UseModalInnerReturnType => {
  const modalInstanceRef = ref<Nullable<ModalMethods>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<number>(0);

  // 获取当前实例
  const getInstance = () => {
    const instance = unref(modalInstanceRef);
    if (!instance) {
      console.error("useModal的实例未定义!");
    }
    return instance;
  };

  const register = (modalMethod: ModalMethods, uuid: number) => {
    tryOnUnmounted(() => {
      modalInstanceRef.value = null;
      // console.log("🚀 ~ 内部组件卸载 ~ uid.value:", uuid);
    });
    uidRef.value = uuid;
    modalInstanceRef.value = modalMethod;
    // 触发当前组件的 register 事件，传递模态框实例和唯一标识符
    currentInstance?.emit("register", modalMethod, uuid);
  };

  // 监听 dataTransfer 中对应 uid 的数据变化
  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)];
    // console.log("🚀 ~ watchEffect ~ data:", data)
    // 如果数据存在且传入了有效的回调函数，则在下一个 DOM 更新周期后执行回调函数。
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  const methods: ReturnInnerMethods = {
    changeLoading: (loading = true) => {
      getInstance()?.setModalProps({ loading });
    },
    setModalProps: (props: ModalProps): void => {
      getInstance()?.setModalProps(props);
    },
    // 获取模态框的打开状态
    // getOpen: computed((): boolean => {
    //   return openData[~~unref(uidRef)];
    // }),
    closeModal: () => {
      getInstance()?.setModalProps({ modelValue: false });
    },
  };
  return [register, methods];
};
