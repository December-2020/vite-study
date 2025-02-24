<!--
 * @Author: Komorebi
 * @Date: 2025-02-24 15:35:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-24 17:03:18
-->
<template>
  <BaseDialog :show-close="false" :align-center="false" class="wrap">
    <template #header>
      <BaseInput placeholder="搜索" size="large" width="100%">
        <template #prefix>
          <ElIcon><Search /></ElIcon>
        </template>
      </BaseInput>
    </template>
    <div class="border border-solid border-red">暂无搜索结果</div>
    <template #footer>
      <div class="wrap-footer flex">
        <div class="btn">
            Svg回车
            <span>确认</span>
        </div>
        <div class="btn">
            Svg上 Svg下
            <span>切换</span>
        </div>
        <div class="btn">
            Svg的Esc
            <span>关闭</span>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.wrap {
  &-footer {
    // border: solid 1px orange;
    text-align: left;
  }
}
</style>
