<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:08:25
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-09-27 15:16:30
-->
<template>
  <div class="wrapper">
    line page
    <el-button @click="handleSend">测试请求</el-button>
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
