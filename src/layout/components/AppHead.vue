<template>
  <div class="wrapper flex justify-between items-center h-100%">
    <div class="wrapper-lt">
      <!-- 收起菜单的svg -->
      <div class="icon" v-if="props.showCollapse" @click="toggleCollapse">
        <SvgIcon :icon-class="menuSvg" class-name="text-4" />
      </div>
    </div>
    <div class="wrapper-rt">
      <theme-switch />
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";

interface Props {
  // 是否显示 收起菜单的svg
  showCollapse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showCollapse: false,
});

// 左侧导航栏展开与收起
let menuSvg = computed(
  () => `common-menu-${store.appSet.isCollapse ? "expand" : "collapse"}`
);
const toggleCollapse = store.appSet.setIsCollapse;
</script>

<style scoped lang="scss">
.wrapper {
  &-lt {
    .icon {
      padding: 14px 10px;
      cursor: pointer;
      @include font_color("content-font-color");
    }
  }
}
</style>
