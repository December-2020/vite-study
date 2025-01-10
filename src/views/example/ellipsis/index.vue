<!--
 * @Author: Komorebi
 * @Date: 2025-01-10 11:18:41
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-10 17:13:31
-->
<template>
  <div class="wrapper w-100%">
    <div class="wrapper-title h-8 font-size-6 lh-tight p-2 b-rd-4px">
      文本省略例子
    </div>
    <div class="wrapper-content mt-4 b-rd-4px overflow-hidden w-100%">
      <el-collapse v-model="activeCollapse" class="w-100%">
        <el-collapse-item title="基本使用" name="1" class="w-100%">
          <div class="collapse-item w-100%">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            optio consequuntur aut officia neque dolore illum inventore autem
            qui veritatis culpa laboriosam quis praesentium enim tenetur ullam,
            esse blanditiis sed.
          </div>
        </el-collapse-item>
        <el-collapse-item title="基本使用1" name="2">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            optio consequuntur aut officia neque dolore illum inventore autem
            qui veritatis culpa laboriosam quis praesentium enim tenetur ullam,
            esse blanditiis sed.
          </div>
        </el-collapse-item>
        <el-collapse-item title="基本使用2" name="3">
          <div>
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
/* 文本省略 */
defineOptions({ name: "TextEllipsis" });

const activeCollapse = ref([]);
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
  }
}
</style>
