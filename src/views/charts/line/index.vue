<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:08:25
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-10 14:29:02
-->
<template>
  <div class="wrapper">
    测试折线图
    <el-button @click="handleSend">测试请求</el-button>
    <SvgIcon icon-class="common-language" class-name="text-16 c-red" />
    <SvgIcon icon-class="nav-charts" class-name="text-16 c-blue" />
    <theme-switch />
  </div>
</template>

<script setup lang="ts">
import LogApi from "@/apis/log";

const handleSend = async () => {
  const res = await LogApi.Query_Log_Page({
    creatorid: "",
    creatoridName: "",
    findMode: "ALL",
    logTypeId: 0,
    paging: {
      allInOne: true,
      pageIndex: 0,
      pageSize: 0,
      sort: [
        {
          direction: "ASC",
          index: 0,
          name: "",
        },
      ],
    },
  });
  console.log(res.msg);
};
</script>

<style scoped lang="scss"></style>
