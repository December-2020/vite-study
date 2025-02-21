<!--
 * @Author: Komorebi
 * @Date: 2025-02-18 16:59:49
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-21 16:44:08
-->
<template>
  <BaseDialog title="弹窗标题3" @register="registerModal" @confirm="confirm">
    <h2>测试弹窗3</h2>
    <p>传递进来的数据: {{ formData }}</p>
  </BaseDialog>
</template>

<script setup lang="ts">
// import API from "@/apis/demo/charts";
import { useModalInner } from "@/hooks/useModal";

const formData = ref({});
// const [registerModal, { changeLoading }] = useModalInner(async (data) => {
const [registerModal] = useModalInner(async (data) => {
  // changeLoading();
  // const res = await API.Get_Line_Data();
  // console.log("🚀 ~ 发出请求 ~ res:", res)
  // console.log("🚀 ~ 传递进来的数据", data);
  formData.value = data;
  // changeLoading(false);
});

const confirm = ()=>{
  /** 
   * ! 数据如何传递出去
   */
  console.log(1111);
}
</script>

<style scoped lang="scss"></style>
