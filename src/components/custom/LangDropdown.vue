<!--
 * @Author: Komorebi
 * @Date: 2024-10-11 09:20:48
 * @LastEditors: Komorebi
 * @LastEditTime: 2024-11-08 16:46:56
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
import { ElMessage } from "element-plus";
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useI18n } from "@/hooks/useI18n";
import { LanguageEnum } from "@/enums/app";

interface Props {
  // 更改时是否刷新界面
  reload?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  reload: false,
});

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
const { meta } = useRoute();
const toggleLanguage = (lang: LanguageEnum) => {
  store.appSet.setLang(lang);
  ElMessage({
    message: useI18n(`ToolTip.langSuccess`),
    type: "success",
  });
  if (props.reload) {
    /** 
     * 强制刷新页面
     * 解决语言切换后
     *  类似弹窗的按钮文字不刷新的问题
     */
    location.reload();
    return;
  }
  // 切换语言后需第一时间更新页面标题
  useTitle(useI18n(meta.title, "Route"));
};
</script>
