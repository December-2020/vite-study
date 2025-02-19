<!--
 * @Author: Komorebi
 * @Date: 2025-02-18 16:59:49
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-19 16:28:04
-->
<template>
  <BaseDialog title="弹窗标题3" @register="registerModal">
    <h2>测试弹窗3</h2>
  </BaseDialog>
</template>

<script setup lang="ts">
import API from "@/apis/demo/charts";
import { useModalInner } from "@/hooks/useModal";

const [registerModal, { changeLoading }] = useModalInner(async (data) => {
  changeLoading();
  const res = await API.Get_Line_Data();
  console.log("🚀 ~ const[registerModal,{changeLoading}]=useModalInner ~ res:", res)
  console.log("🚀 ~ useModalInner ~ data:", data);
  changeLoading(false);
});

</script>

<style scoped lang="scss"></style>
