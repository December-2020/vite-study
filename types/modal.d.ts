/*
 * @Author: Komorebi
 * @Date: 2025-02-18 11:01:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-08-18 15:27:27
 */
import type { ExtractPublicPropTypes } from "vue";
import type { DialogProps } from "element-plus";

export type UseModalReturnType = [RegisterFn, ReturnMethods];

export type RegisterFn = (modalMethods: ModalMethods, uuid: number) => void;
export interface ReturnMethods extends ModalMethods {
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void;
  closeModal: () => void;
  // getOpen?: ComputedRef<boolean>;
}

export interface ModalMethods {
  setModalProps: (props: ModalProps) => void;
  emitOpen?: (open: boolean, uid: number) => void;
  // redoModalHeight?: () => void;
}

export interface ModalProps extends ExtractPublicPropTypes<DialogProps> {
  isContentScroll?: boolean;
  contentMaxHeight?: string | number;
  hideFooter?: boolean;
  cancelText?: string;
  confirmText?: string;
  loading?: boolean;
}

// ModalMethods
// Omit<ReturnMethods, "openModal">;
export interface ReturnInnerMethods extends Omit<ReturnMethods, "openModal"> {
  // closeModal: () => void;
  // getOpen?: ComputedRef<boolean>;
  changeLoading: (loading?: boolean) => void;
}
export type UseModalInnerReturnType = [RegisterFn, ReturnInnerMethods];
