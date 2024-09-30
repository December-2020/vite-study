<!--
 * @Author: Komorebi
 * @Date: 2024-09-29 16:29:45
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-30 09:23:34
-->
<template>
  <component :is="h(ElButton, props, $slots)" />
</template>

<script setup lang="ts">
// import type { EpPropMergeType } from "element-plus/es/utils/index.mjs";

import { h } from "vue";
import { ElButton, buttonProps } from "element-plus";

type Props = typeof buttonProps & { content?: String };
// const props = defineProps(
//   Object.assign(buttonProps, {
//     // type: {
//     //   type: String as PropType<
//     //     EpPropMergeType<
//     //       StringConstructor,
//     //       "primary"| "success"| "warning"| "danger"| "info",
//     //       unknown
//     //     >
//     //   >,
//     //   default: "primary",
//     //   validator: (value: string) => {
//     //     return ["primary", "success", "warning", "danger", "info"].includes(
//     //       value
//     //     );
//     //   },
//     // },
//     content: {
//       type: String,
//       default: "111",
//     },
//   })
// );

const props = withDefaults(defineProps<Props>(),{
  type:"primary"
})
</script>

<style scoped lang="scss"></style>
