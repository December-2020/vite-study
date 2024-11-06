<!--
 * @Author: Komorebi
 * @Date: 2024-10-11 09:20:48
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-06 16:36:56
-->
<template>
  <base-dropdown
    class="lang-dropdown"
    :options="langList"
    @command="toggleLanguage"
    trigger="click"
  >
    <div class="cursor-pointer p-8px">
      <SvgIcon icon-class="common-language" class-name="text-4.5" />
    </div>
  </base-dropdown>
</template>

<script setup lang="ts">
import store from "@/store";
import i18n from "@/locales";
import { ElMessage } from "element-plus";
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useI18n } from "@/hooks/useI18n";
import { LanguageEnum } from "@/enums/app";

// 国际化
const languageList = [
  { label: "简体中文", value: LanguageEnum.CHINESE },
  { label: "English", value: LanguageEnum.ENGLISH },
];
const langList = computed(() =>
  languageList.map((item) => ({
    label: item.label,
    key: item.value,
    command: item.value,
    disabled: item.value === store.appSet.lang,
  }))
);
const { t } = i18n.global;
const { meta } = useRoute();
const toggleLanguage = (lang: LanguageEnum) => {
  store.appSet.setLang(lang);
  ElMessage({
    message: t(`ToolTip.langSuccess`),
    type: "success",
  });
  // 切换语言后需第一时间更新页面标题
  useTitle(useI18n(meta.title, "Route"));
};
</script>
