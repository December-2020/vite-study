<template>
  <SvgIcon icon-class="common-theme_sun" class-name="sun"></SvgIcon>
</template>

<script setup lang="ts">
/**
 * Vue3.3+
 */
defineOptions({
  name: "Sun",
});
</script>

<style scoped lang="scss">
.sun {
  /**
  * *  必须先设定当前主题, 才能使用
  */
  //   @include font_color("content-font-color");

  color: #1a1a1a;
}
</style>
