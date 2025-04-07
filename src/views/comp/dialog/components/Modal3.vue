<!--
 * @Author: Komorebi
 * @Date: 2025-02-18 16:59:49
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-24 10:44:52
-->
<template>
  <BaseDialog
    title="弹窗标题3"
    @register="registerModal"
    @confirm="handleConfirm"
  >
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

/**
 * * 传递数据到弹窗外部
 * ! register 必须书写, 否则控制台会报警告
 */
const emit = defineEmits(["confirm", "register"]);
const handleConfirm = () => {
  emit("confirm", { formData: toRaw(unref(formData)) });
};
</script>

<style scoped lang="scss"></style>
