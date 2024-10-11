<template>
  <base-dropdown
    class="lang-dropdown"
    :options="langList"
    @command="toggleLanguage"
    trigger="click"
  >
    <SvgIcon icon-class="common-language" class-name="text-4" />
  </base-dropdown>
</template>

<script setup lang="ts">
import store from "@/store";
import i18n from "@/locales";
import { ElMessage } from "element-plus";
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
const toggleLanguage = (lang: LanguageEnum) => {
  store.appSet.setLang(lang);
  ElMessage({
    message: t(`ToolTip.langSuccess`),
    type: "success",
  });
};
</script>
