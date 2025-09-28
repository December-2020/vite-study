<!--
 * @Author: Komorebi
 * @Date: 2025-09-28 15:24:41
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-28 17:12:33
-->
<template>
  <div class="wrapper" ref="domRef">
    <div class="shape">
      <div class="text">This shape use clip-path</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const domRef = ref();
defineExpose({ domRef });
</script>

<style scoped lang="scss">
.wrapper {
  .shape {
    background: linear-gradient(90deg, #b5eaff 0%, #73d7ef 100%);
    padding: 40px 60px;
    position: relative;
    overflow: hidden;
    clip-path: polygon(
      0% 0%,    /* 左上角顶点 */ 
      97% 0%,   /* 右上角顶点（右侧顶部收窄） */
      100% 50%, /* 右侧中间顶点 */
      97% 100%, /* 右下角顶点（右侧底部收窄） */ 
      0% 100%,  /* 左下角顶点 */ 
      3% 50%    /* 左侧中间顶点（左侧收窄） */
    );
    &::after {
      content: "";
      position: absolute;
      left: 100%;
      top: 50%;
      width: 0;
      height: 0;
      border-left: 14px solid #ff7043;
      border-right: 14px solid transparent;
      border-bottom: 14px solid transparent;
      border-top: 14px solid transparent;
      transform: translate(-50%, -50%);
    }
    .text {
      text-align: center;
      color: #222;
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
