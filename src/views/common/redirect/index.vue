<!--
 * @Author: Komorebi
 * @Date: 2024-11-08 11:16:08
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-08 11:19:47
-->
<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const { currentRoute, replace } = useRouter();
/**
 * unref 计算的一个语法糖
 * 如果参数是ref, 则返回内部值, 否则返回参数本身
 * val = isRef(val) ? val.value : val
 */
const { params, query } = unref(currentRoute);
const { path } = params;
// console.log(path, "重定向打印的path");

// 用于删除属性, 返回值表明该属性是否被成功删除
Reflect.deleteProperty(params, "path");

const _path = Array.isArray(path) ? path.join("/") : path;
replace({
  path: _path.startsWith("/") ? _path : "/" + _path,
  query,
});
</script>
