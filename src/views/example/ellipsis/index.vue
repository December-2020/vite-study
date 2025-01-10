<!--
 * @Author: Komorebi
 * @Date: 2025-01-10 11:18:41
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-10 15:03:17
-->
<template>
  <div class="wrapper">
    <div class="wrapper-title h-8 font-size-6 lh-tight">文本省略例子</div>
    <div class="wrapper-content">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item title="基本使用" name="1">
          <div class="collapse-item w-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dolorem optio consequuntur aut officia neque dolore illum inventore autem qui veritatis culpa laboriosam quis praesentium enim tenetur ullam, esse blanditiis sed.
          </div>
        </el-collapse-item>
        <el-collapse-item title="基本使用1" name="2">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dolorem optio consequuntur aut officia neque dolore illum inventore autem qui veritatis culpa laboriosam quis praesentium enim tenetur ullam, esse blanditiis sed.
          </div>
        </el-collapse-item>
        <el-collapse-item title="基本使用2" name="3">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Dolorem optio consequuntur aut officia neque dolore illum inventore autem qui veritatis culpa laboriosam quis praesentium enim tenetur ullam, esse blanditiis sed.
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
/* 文本省略 */
defineOptions({ name: "TextEllipsis" });

const activeCollapse = ref([]);
</script>

<style scoped lang="scss">
.wrapper {
  &-title {
    border: solid 1px red;
  }
}
</style>
