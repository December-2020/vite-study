<template>
  <div class="wrapper">
    login page
    <BaseButton text type="success">1111</BaseButton>
    <BaseButton>2222</BaseButton>
    <BaseInput v-model="val" />
  </div>
</template>

<script setup lang="ts">
const val = ref("");
watchEffect(() => console.log(val.value));
</script>

<style scoped lang="scss">
.wrapper {
  .text {
    width: 300px;
  }
}
</style>
