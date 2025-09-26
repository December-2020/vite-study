<!--
 * @Author: Komorebi
 * @Date: 2024-09-27 10:28:06
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-09-22 16:07:20
-->
<template>
  <div class="wrapper overflow-hidden">
    <canvas ref="canvasRef"></canvas>
    <div class="login-wrapper border-rd-8px">
      <div class="header-wrapper flex flex-justify-end p-16px pos-relative">
        <theme-switch class="m-r-10px" />
        <lang-dropdown />
        <h2 class="header-wrapper-title">{{ $t("Login.login") }}</h2>
      </div>
      <div class="content-wrap box-border">
        <el-form ref="formRef" :model="formData" :rules="rules" size="large">
          <el-form-item prop="username">
            <BaseInput
              v-model="formData.username"
              :placeholder="$t(`Login.inputUsername`)"
              width="100%"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <BaseInput
              v-model="formData.password"
              :placeholder="$t(`Login.inputPassword`)"
              width="100%"
              type="password"
              show-password
              size="large"
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
import { useLineAnimate } from "@/hooks/useLineAnimate";

defineOptions({ name: "Login" });

interface RuleForm {
  username: string;
  password: string;
}

/* canvas */
const canvasRef = ref<HTMLCanvasElement | null>(null);
const { setOptions } = useLineAnimate(canvasRef);
watchEffect(() => {
  let isPC = store.appSet.isPC;
  setOptions({
    dotNum: isPC ? 100 : 30,
    distance: isPC ? 100 : 60,
  });
});

/* 表单相关 */
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
        router.push(path);
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped lang="scss">
.wrapper {
  .login-wrapper {
    position: absolute;
    width: 400px;
    height: 270px;
    left: calc(50% - 200px);
    top: calc(50% - 135px);
    border: solid 1px #eee;
    background-color: var(--content-bg-color);
    color: var(--content-font-color);
    .header-wrapper {
      &-title {
        position: absolute;
        left: calc(50% - 24px);
        top: 0;
      }
    }
    .content-wrap {
      padding: {
        top: 16px;
        left: 16px;
        right: 16px;
      }
    }
  }
  /* 仅移动端生效 */
  @media (max-width: 768px) {
    .login-wrapper {
      width: calc(100vw - 20px);
      left: 10px;
    }
  }
}
</style>
