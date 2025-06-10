import type { AnyFunctionType } from "#/global";

/**
 * 在 OnMounted 或者 OnActivated 时触发
 * @param hook 任何函数（包括异步函数）
 */
export function onMountedOrActivated(hook: AnyFunctionType) {
  let mounted: boolean;

  onMounted(() => {
    hook();
    nextTick(() => {
      mounted = true;
    });
  });

  onActivated(() => {
    if (mounted) {
      hook();
    }
  });
}

/**
 * 在 OnBeforeUnmount 或者 OnDeactivated 时触发
 * @param hook 任何函数（包括异步函数）
 */
export function onBeforeUnmountOrDeactivated(hook: AnyFunctionType) {
  onBeforeUnmount(() => {
    hook();
  });

  onDeactivated(() => {
    hook();
  });
}
