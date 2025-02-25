<!--
 * @Author: Komorebi
 * @Date: 2025-02-12 15:46:45
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-24 14:14:37
-->
<template>
  <BaseDialog title="弹窗2" @register="registerModal" v-bind="$attrs">
    <h2>发出请求</h2>
    <div v-for="item in countList" :key="item.id">
      <p>标题: {{ item.title }}</p>
      <span>总数: {{ item.total }}</span>
      <span class="inline-block m-l-16">类型: {{ item.type }}</span>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import type { LineData, LineCount } from "#Api/charts";

import API from "@/apis/demo/charts";
import { useModalInner } from "@/hooks/useModal";

/**
 * ! 使用动态组件, 外部没有使用 register 注册时
 * ! 组件内部会因 dataTransfer[uid] 为 undefined
 * ! 而无法执行 useModalInner 中的回调函数
 * * 通过props传参
 * ? 如何加载后再发出请求
 * * 生命周期钩子函数
 * 
 * TODO: 动态高度但未达到最大高度时, 会显示滚动条
 */
const props = defineProps({ testData: { type: Object } });
const [registerModal, { changeLoading }] = useModalInner();
const countList = ref<LineCount[]>([]);

onMounted(async () => {
  changeLoading();
  console.log("🚀 ~ props:", props);
  const res = await API.Get_Line_Data();
  let data = res.data as LineData;
  countList.value = data.countList;
  // countList.value = res.data.countList;
  // console.log("🚀 ~ 测试请求的数据", res);
  changeLoading(false);
});
</script>

<style scoped lang="scss"></style>
