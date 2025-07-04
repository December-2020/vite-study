<!--
 * @Author: Komorebi
 * @Date: 2025-07-04 14:45:42
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-04 16:11:03
-->
<template>
  <div class="wrapper">
    <span>
      <b>Hello, <span class="highlight">This is a base demo</span>! </b>
    </span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 32px 40px;
  font-weight: bold;
  border-radius: 12px;
  background: linear-gradient(120deg, #f8fbff 60%, #eaf3fa 100%);
  box-shadow: 0 4px 16px 0 rgba(30, 42, 80, 0.08);
  position: relative;
  border: none;
  font-size: large;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 100%;
    border-radius: 14px 0 0 14px;
    background: linear-gradient(180deg, #ff6a3d 0%, #ffb86c 100%);
    box-shadow: 2px 0 8px 0 rgba(255, 106, 61, 0.15);
  }
  .highlight {
    font-weight: bold;
  }
  span {
    @include font_color("content-bg-color");
  }
}
</style>
