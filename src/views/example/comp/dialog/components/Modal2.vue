<!--
 * @Author: Komorebi
 * @Date: 2025-02-12 15:46:45
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-21 16:38:53
-->
<template>
  <BaseDialog title="弹窗2" @register="registerModal" v-bind="$attrs">
    <!-- 
      !bug: 
      ! 使用动态组件, 外部没有使用 register 注册时
      ! 组件内部会因 dataTransfer[uid] 为 undefined
      ! 而无法执行 useModalInner 中的回调函数
    -->
    <h2>发出请求</h2>
  </BaseDialog>
</template>

<script setup lang="ts">
import API from "@/apis/demo/charts";
import { useModalInner } from "@/hooks/useModal";

const [registerModal, { changeLoading }] = useModalInner(async (data) => {
  console.log("🚀 ~ data:", data)
  changeLoading();
  const res = await API.Get_Line_Data();
  console.log("🚀 ~ 测试请求的数据", res)
  changeLoading(false);
});
</script>

<style scoped lang="scss"></style>
