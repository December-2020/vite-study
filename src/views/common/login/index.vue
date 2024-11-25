<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:28:06
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-08 14:17:56
-->
<template>
  <div class="wrapper w-100% h-100% flex flex-col">
    <div class="header-wrap flex flex-justify-end p-16px">
      <theme-switch class="m-r-10px" />
      <lang-dropdown />
    </div>
    <div class="content-wrap flex-1 flex justify-center items-center">
      <div
        class="login-wrapper h-240px w-400px border-rd-8px p-16px box-border"
      >
        <h2 class="text-center mt-12px">{{ $t("Login.login") }}</h2>
        <el-form ref="formRef" :model="formData" :rules="rules">
          <el-form-item prop="username">
            <BaseInput
              v-model="formData.username"
              :placeholder="$t(`Login.inputUsername`)"
              width="100%"
            />
          </el-form-item>
          <el-form-item prop="password">
            <BaseInput
              v-model="formData.password"
              :placeholder="$t(`Login.inputPassword`)"
              width="100%"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <BaseButton class="w-100%" @click="submitForm(formRef)">
              {{ $t("Login.login") }}
            </BaseButton>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

import i18n from "@/locales";
import store from "@/store";
import API from "@/apis/demo/user";
import { useRouter, useRoute } from "vue-router";

defineOptions({ name: "Login" });

interface RuleForm {
  username: string;
  password: string;
}

const { t } = i18n.global;
const formRef = ref<FormInstance>();
const formData = reactive<RuleForm>({
  username: "admin",
  password: "123",
});
/**
 * * 国际化必须把校验规则放在computed中
 */
const rules = computed(() => {
  return reactive<FormRules<RuleForm>>({
    username: [
      {
        required: true,
        message: t(`Login.inputUsername`),
        trigger: "blur",
      },
      // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
    ],
    password: [
      {
        required: true,
        message: t(`Login.inputPassword`),
        trigger: "blur",
      },
    ],
  });
});
/**
 * * 必须放在setup下
 */
const router = useRouter();
const route = useRoute();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // 路由跳转是异步操作，所以需要await
      /**
       * * 请求路径中是否有redirect
       * * 无则走 "/"
       */
      let path = "/";
      let redirect = route.query?.redirect;
      if (typeof redirect === "string") {
        path = redirect;
      }
      const res = await API.Get_User_Info(formData);
      if (res.success) {
        store.user.login(res.data);
        router.replace(path);
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped lang="scss">
.wrapper {
  background: url("@/assets/images/login_bg.webp");
  .login-wrapper {
    @include background_color("content-bg-color");
    @include font_color("content-font-color");
  }
}
</style>
