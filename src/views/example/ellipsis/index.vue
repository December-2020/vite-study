<!--
 * @Author: Komorebi
 * @Date: 2025-01-10 11:18:41
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-11 13:56:55
-->
<template>
  <div class="wrapper">
    <div class="wrapper-title h-8 font-size-6 lh-tight p-2 b-rd-4px">
      文本省略例子
    </div>
    <div class="wrapper-content mt-4 b-rd-4px overflow-hidden">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item title="基本使用" name="1" class="w-100%">
          <div class="collapse-item-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          </div>
        </el-collapse-item>
        <el-collapse-item title="基本使用1" name="2">
          <div class="collapse-item-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            optio consequuntur aut officia neque dolore illum inventore autem
            qui veritatis culpa laboriosam quis praesentium enim tenetur ullam,
            esse blanditiis sed.
          </div>
        </el-collapse-item>
        <el-collapse-item title="基本使用2" name="3">
          <div class="collapse-item-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            optio consequuntur aut officia neque dolore illum inventore autem
            qui veritatis culpa laboriosam quis praesentium enim tenetur ullam,
            esse blanditiis sed.
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { storeToRefs } from "pinia";

defineOptions({ name: "TextEllipsis" });

const activeCollapse = ref([]);
/**
 * !bug:
 * !内容单行显示不下时, 点击展开按钮, 该展开项会变宽
 * !修复方式:对展开项设置一个宽度
 */
const collapseWidth = computed(() => {
  const { isCollapse } = storeToRefs(store.appSet);
  /**
   * * 侧边栏收起时 64px, 展开时 210px
   * * main 盒子的padding 是20px, 左右即 40px
   * * collapse-item的padding是6px, 左右即 12px
   */
  let _width = (isCollapse.value ? 64 : 210) + 40 + 12;
  return `calc(100vw - ${_width}px)`;
});
</script>

<style scoped lang="scss">
.wrapper {
  &-title {
    @include background_color("content-font-bg-color");
  }
  &-content {
    :deep(.el-collapse) {
      .el-collapse-item__header,
      .el-collapse-item__wrap {
        padding-left: 6px;
        padding-right: 6px;
      }
    }
    // 仅pc端生效
    @media (min-width: 768px) {
      .collapse-item-content {
        max-width: v-bind(collapseWidth);
      }
    }
  }
}
</style>
