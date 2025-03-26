<!--
 * @Author: Komorebi
 * @Date: 2025-02-24 15:35:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-03-26 17:23:27
-->
<template>
  <BaseDialog
    :show-close="false"
    :align-center="false"
    class="wrap"
    width="500"
    @register="registerModal"
  >
    <template #header>
      <BaseInput
        :placeholder="$t('Layout.search.title')"
        size="large"
        width="100%"
        v-model="keyword"
        ref="searchInputRef"
        @keyup.enter="handleEnter"
        @keyup.down="highlightNext"
        @keyup.up="highlightPrev"
      >
        <template #prefix>
          <ElIcon><Search /></ElIcon>
        </template>
      </BaseInput>
    </template>
    <div class="wrap-content font-size-16px">
      <div class="search-list" v-show="searchList.length">
        <div
          v-for="(item, index) in searchList"
          :key="item.name"
          :class="['search-list_item', { highlight: highlightIndex === index }]"
        >
          <div class="title" v-html="item.title"></div>
        </div>
      </div>
      <div class="empty" v-show="!searchList.length">
        {{ $t("Layout.search.noResult") }}
      </div>
    </div>
    <template #footer>
      <div class="wrap-footer flex font-size-13px">
        <div class="btn flex">
          <div class="btn-item">
            <SvgIcon icon-class="keyword-enter" class-name="text-4 icon" />
          </div>
          <div class="line-height-20px">{{ $t("Layout.search.confirm") }}</div>
        </div>
        <div class="btn flex">
          <div class="btn-item">
            <SvgIcon icon-class="keyword-arrow_up" class-name="text-4 icon" />
            <SvgIcon icon-class="keyword-arrow_down" class-name="text-4 icon" />
          </div>
          <div class="line-height-20px">{{ $t("Layout.search.toggle") }}</div>
        </div>
        <div class="btn flex">
          <div class="btn-item">
            <span class="icon line-height-20px esc">Esc</span>
          </div>
          <div class="line-height-20px">{{ $t("Layout.search.close") }}</div>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import type { AppRouteRecordRaw } from "#/route";

import { Search } from "@element-plus/icons-vue";
import { watchDebounced } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useModalInner } from "@/hooks/useModal";
import { useI18n } from "@/hooks/useI18n";

interface SearchItem extends Pick<AppRouteRecordRaw, "name"> {
  title: string;
  children?: SearchItem[];
}

// 所有路由列表
const router = useRouter();
const searchList = ref<SearchItem[]>([]);
const optionList = ref<SearchItem[]>([]);
const searchInputRef = ref();

// 递归获取路由
const getRecursRoute = (route: AppRouteRecordRaw) => {
  let _searchItem: SearchItem = {
    title: useI18n(route.meta.title, "Route") || "",
    name: route.name,
  };
  if (route.children && route.children.length) {
    _searchItem.children = route.children.map((child) => getRecursRoute(child));
  }
  return _searchItem;
};
const [registerModal] = useModalInner(() => {
  nextTick(() => {
    /**
     * * 为了避免在弹窗打开时，input 无法获取焦点
     * * 使用 nextTick 来确保 input 获取焦点
     */
    searchInputRef.value?.focus();
    // 获取路由列表
    const routeList = router.getRoutes();
    // 获取动态的一级路由
    optionList.value = routeList.flatMap((item) =>
      !item.meta.hidden && item.meta.title && item.path.split("/").length === 2
        ? [getRecursRoute(item as AppRouteRecordRaw)]
        : []
    );
    // console.log("🚀 ~ optionList:", optionList.value);
  });
});

const keyword = ref("");
const resultList = ref([]);
const highlightIndex = ref(-1);

// 高亮关键字
const highlightKeyword = (text: string, keyword: string) => {
  const regex = new RegExp(keyword, "gi");
  return text.replace(
    regex,
    (match) => `<span class="highlight">${match}</span>`
  );
};
// 递归获取搜索结果
const getRecursResult = (
  list: SearchItem[],
  keyword: string,
  parentTitle = ""
) => {
  if (!list.length || keyword.trim() === "") return [];
  const resultList: SearchItem[] = [];
  for (const item of list) {
    const currTitle = parentTitle ? `${parentTitle}/${item.title}` : item.title;
    if (item.title.includes(keyword)) {
      // 高亮标题
      const highlightedTitle = highlightKeyword(currTitle, keyword);
      resultList.push({ ...item, title: highlightedTitle });
    }
    if (item.children?.length) {
      const childResultList = getRecursResult(
        item.children,
        keyword,
        currTitle
      );
      resultList.push(...childResultList);
    }
  }
  return resultList;
};
const stopWatchInput = watchDebounced(
  keyword,
  (val) => {
    // console.log(val, "change");
    highlightIndex.value = -1;
    let _searchList: SearchItem[] = getRecursResult(optionList.value, val);
    searchList.value = _searchList;
    console.log("🚀 ~ searchList:", searchList);
  },
  { debounce: 500 }
);

// enter 事件
const handleEnter = () => {
  console.log("enter1111");
};
const highlightNext = () => {
  console.log("highlightNext");
  highlightIndex.value = Math.min(
    highlightIndex.value + 1,
    resultList.value.length - 1
  );
};
const highlightPrev = () => {
  console.log("highlightPrev");
  highlightIndex.value = Math.max(highlightIndex.value - 1, -1);
};
// const navigateTo = (item) => {
//   // router.push(item.path);
//   keyword.value = '';
//   resultList.value = [];
// };

onUnmounted(() => {
  // 释放内存
  stopWatchInput();
});
</script>

<style scoped lang="scss">
.wrap {
  &-content {
    @include font_color("content-font-color");
    min-height: 100px;
    .empty {
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
  }
  &-footer {
    text-align: left;
    border-top: solid 1px;
    @include border_color("content-border-color");
    @include font_color("content-font-color");
    // @include background_color("content-bg-color");
    margin-top: -8px;
    padding-top: 8px;
    .btn {
      &:not(:first-child) {
        margin-left: 10px;
      }
      &-item {
        .icon {
          @include border_color("content-border-color");
          border: solid 1px;
          padding: 1px;
          border-radius: 2px;
          & + .icon {
            margin-left: 5px;
          }
          &.esc {
            padding: 1px 2px;
          }
        }
        & + div {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
