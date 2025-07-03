/*
 * @Author: Komorebi
 * @Date: 2025-07-03 11:32:27
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-03 11:55:32
 */
interface ScriptOptions {
  src: string; // 脚本的 URL 地址
}

export function useScript(options: ScriptOptions) {
  const isLoading = ref(false);
  const isError = ref(false);
  const isSuccess = ref(false);
  let script: HTMLScriptElement | null = null;

  const promise = new Promise((resolve, reject) => {
    onMounted(() => {
      script = document.createElement("script");
      script.type = "text/javascript";
      script.onload = () => {
        isLoading.value = false;
        isSuccess.value = true;
        isError.value = false;
        resolve("");
      };

      script.onerror = (err) => {
        isLoading.value = false;
        isSuccess.value = false;
        isError.value = true;
        reject(err);
      };

      script.src = options.src;
      document.body.appendChild(script);
    });
  });

  onUnmounted(() => {
    if (script) {
      script.remove();
      script = null;
    }
  });

  return { isLoading, isError, isSuccess, loadScript: () => promise };
}
