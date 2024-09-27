<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  iconClass: string;
  className?: string;
}

const props = defineProps<Props>();

const svgClass = computed(
  () => `svg-icon ${props.className ? props.className : ""}`
);
const iconName = computed(() => `#icon-${props.iconClass}`);
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  // overflow: hidden;
}
</style>
