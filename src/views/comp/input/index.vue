<!--
 * @Author: Komorebi
 * @Date: 2025-09-11 13:56:41
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-11 16:35:02
-->
<template>
  <div class="wrapper">
    <div class="wrapper-title h-8 font-size-6 lh-tight p-2 b-rd-4px">
      输入框例子
    </div>
    <div class="wrapper-content mt-4 b-rd-4px flex-1 p-2">
      <div class="item">
        <ElAlert title="基础使用" show-icon :closable="false" />
        <BaseInput
          v-model="iptVal1"
          @blur="handleIpt1Blur"
          @focus="handleIpt1Focus"
          clearable
          @clear="handleIpt1Clear"
          class="mt-1"
        />
      </div>
      <div class="item mt-2">
        <ElAlert title="使用插槽" show-icon :closable="false" />
        <BaseInput v-model="iptVal2" width="auto" class="mt-1">
          <template #prepend>Http://</template>
          <template #append>.com</template>
        </BaseInput>
      </div>
      <div class="item mt-2">
        <ElAlert title="使用前/后缀" show-icon :closable="false" />
        <BaseInput
          v-model="iptVal3"
          width="auto"
          class="mt-1"
          :prefix-icon="Search"
          :suffix-icon="Calendar"
        />
      </div>
      <div class="item mt-2">
        <ElAlert
          title="vue原有的修饰符: 以number为例"
          show-icon
          :closable="false"
        />
        <BaseInput v-model.number="iptVal4" width="auto" class="mt-1" />
      </div>
      <div class="item mt-2">
        <ElAlert
          title="自定义的修饰符: 可填整数、小数"
          show-icon
          :closable="false"
        />
        <BaseInput v-model.decimal="iptVal5" width="auto" class="mt-1" />
      </div>
      <div class="item mt-2">
        <ElAlert title="金额格式化" show-icon :closable="false" />
        <BaseInput
          v-model.decimal="iptVal6"
          width="auto"
          class="mt-1"
          :formatter="iptVal6Formatted"
          :parser="iptVal6Parser"
        />
      </div>
      <div class="item mt-2">
        <ElAlert title="密码框" show-icon :closable="false" />
        <BaseInput
          v-model="iptVal7"
          width="auto"
          class="mt-1"
          type="password"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Search } from "@element-plus/icons-vue";

defineOptions({ name: "CompInput" });

const iptVal1 = ref("");
const handleIpt1Focus = () => {
  console.log("输入框1获得焦点:", iptVal1.value);
};
const handleIpt1Blur = () => {
  console.log("输入框1失去焦点:", iptVal1.value);
};
const handleIpt1Clear = () => {
  console.log("输入框1清空值");
};

const iptVal2 = ref("");
const iptVal3 = ref("");
const iptVal4 = ref("");
const iptVal5 = ref("");

const iptVal6 = ref("");
const iptVal6Formatted = (value: string) =>
  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const iptVal6Parser = (value: string) => value.replace(/\$\s?|(,*)/g, "");

const iptVal7 = ref("test");
</script>

<style scoped lang="scss">
.wrapper {
  &-title,
  &-content {
    background-color: var(--content-font-bg-color);
  }

  &-content {
    .item {
      &:not(:first-child) {
        margin-top: 20px;
      }
    }
  }
}
</style>
