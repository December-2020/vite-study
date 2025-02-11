<template>
  <component
    :is="h(ElDialog, props, $slots)"
    ref="DialogRef"
    @open="emit('open')"
    @opened="emit('opened')"
    @close="emit('close')"
    @closed="emit('closed')"
    @open-auto-focus="emit('open-auto-focus')"
    @close-auto-focus="emit('close-auto-focus')"
  />
</template>

<script setup lang="ts">
import type { DialogProps } from "element-plus";

import { h } from "vue";
import { ElDialog } from "element-plus";
import "element-plus/theme-chalk/el-dialog.css";

type Props = Partial<DialogProps>;
const props = withDefaults(defineProps<Props>(), {
  appendToBody: true,
});

const emit = defineEmits([
  "open",
  "opened",
  "close",
  "closed",
  "open-auto-focus",
  "close-auto-focus",
]);

const DialogRef = ref();
defineExpose(
  new Proxy(
    {},
    {
      get(_target, prop) {
        return DialogRef.value?.[prop];
      },
      has(_target, prop) {
        return prop in DialogRef.value;
      },
    }
  )
);
</script>
