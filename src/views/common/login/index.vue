<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:28:06
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-10-08 16:41:18
-->
<template>
  <div class="wrapper w-100% h-100% flex justify-center items-center">
    <div class="login-wrapper h-240px w-400px">
      <!-- <h2 class="text-center">{{ $t("Login.title") }}</h2> -->
      <!-- <base-switch>
        <template #active-action>
          <span class="custom-active-action">T</span>
        </template>
        <template #inactive-action>
          <span class="custom-inactive-action">F</span>
        </template>
      </base-switch> -->
      <theme-switch />
      <lang-dropdown />
      <el-date-picker
        type="date"
        :placeholder="$t('Components.inputPlaceholder')"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.wrapper {
  // background: url("@/assets/images/login_bg.webp");
  .login-wrapper {
    @include background_color("content-bg-color");
    @include font_color("content-font-color");
    h2 {
      // @include font_color("content-font-color");
      border: solid 1px red;
    }
  }
}
</style>
