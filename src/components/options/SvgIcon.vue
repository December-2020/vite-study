<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 16:03:46
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-27 16:04:33
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "SvgIcon",
  props: {
    // icon 名称
    iconClass: {
      type: String,
      required: true,
    },
    // icon 样式
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return "svg-icon " + props.className;
      } else {
        return "svg-icon";
      }
    });
    return {
      iconName,
      svgClass,
    };
  },
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  // overflow: hidden;
}
</style>
