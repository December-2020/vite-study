<!--
 * @Author: Komorebi
 * @Date: 2025-02-24 15:35:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-08-22 14:43:48
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
        @keyup.up="searchPrev"
        @keyup.down="searchDown"
        @keyup.enter="searchEnter"
        preventKeyboardEvent
        :keyboardList="['ArrowUp', 'ArrowDown']"
      >
        <ElIcon #prefix>
          <Search />
        </ElIcon>
      </BaseInput>
    </template>
    <div class="wrap-content font-size-16px">
      <div class="search-list" v-show="searchList.length">
        <div
          v-for="(item, index) in searchList"
          :key="item.name"
          :class="['search-list_item', { highlight: highlightIndex === index }]"
          @click="toggleSearchItem(item, index)"
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
const [registerModal, { closeModal }] = useModalInner(() => {
  nextTick(() => {
    /**
     * * 为了避免在弹窗打开时，input 无法获取焦点
     * * 使用 nextTick 来确保 input 获取焦点
     */
    searchInputRef.value?.focus();
    // 获取路由列表
    const routeList = router.getRoutes();
    // console.log("🚀 ~ nextTick ~ routeList:", routeList);
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
const searchList = ref<SearchItem[]>([]);
const highlightIndex = ref(-1);
// 递归获取搜索结果
const getRecursResult = (
  list: SearchItem[],
  keyword: string,
  parentTitle = ""
) => {
  if (!list.length || keyword.trim() === "") return [];
  const resultList: SearchItem[] = [];
  for (const item of list) {
    const currTitle = parentTitle
      ? `${parentTitle} / ${item.title}`
      : item.title;
    // 正则表达式，忽略大小写
    const Regex = new RegExp(keyword, "gi");
    // 匹配关键字
    if (Regex.test(item.title)) {
      // 高亮关键字
      const highlightedTitle = currTitle.replace(
        Regex,
        (match) => `<span class="highlight">${match}</span>`
      );
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
    let _searchList: SearchItem[] = getRecursResult(optionList.value, val);
    /**
     * * 剔除有子路由的项目
     * * 当有子路由时, 跳转的是Layout组件, 而不是具体的路由组件
     */
    searchList.value = _searchList.filter((item) => !item.children);
    // console.log("🚀 ~ searchList:", searchList);
    let index = _searchList.length > 0 ? 0 : -1;
    highlightIndex.value = index;
  },
  { debounce: 500 }
);

// 搜索框事件
const searchPrev = () => {
  highlightIndex.value = Math.max(highlightIndex.value - 1, 0);
};
const searchDown = () => {
  highlightIndex.value = Math.min(
    highlightIndex.value + 1,
    searchList.value.length - 1
  );
};
const searchEnter = () => {
  const index = unref(highlightIndex);
  const _searchList = unref(searchList);
  if (index > -1 && _searchList.length > 0) {
    navigateTo(_searchList[index]);
  }
};
const toggleSearchItem = (item: SearchItem, index: number) => {
  highlightIndex.value = index;
  navigateTo(item);
};
const navigateTo = (item: SearchItem) => {
  router.push({ name: item.name });
  keyword.value = "";
  highlightIndex.value = -1;
  searchList.value = [];
  closeModal();
};

onUnmounted(() => {
  // 释放内存
  stopWatchInput();
});
</script>

<style scoped lang="scss">
.wrap {
  &-content {
    color: var(--content-font-color);
    min-height: 100px;
    .search-list {
      cursor: pointer;
      &_item {
        background-color: var(--content-font-bg-color);
        color: var(--content-font-color);
        padding: 8px;
        box-sizing: border-box;
        border-radius: 4px;
        &:not(:first-child) {
          margin-top: 8px;
        }
        &.highlight,
        &:hover {
          background-color: var(--content-font-active-color);
          color: var(--content-font-color);
          div {
            :deep(span) {
              &.highlight {
                color: var(--content-font-color);
              }
            }
          }
        }
        div {
          :deep(span) {
            &.highlight {
              color: var(--content-font-active-color);
            }
          }
        }
      }
    }
    .empty {
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
  }
  &-footer {
    text-align: left;
    border-top: solid 1px;
    border-color: var(--content-border-color);
    color: var(--content-font-color);
    background-color: var(--content-bg-color);
    // margin-top: -8px;
    // padding-top: 8px;
    padding: 8px 12px;
    box-sizing: border-box;
    border-radius: 4px;
    .btn {
      &:not(:first-child) {
        margin-left: 10px;
      }
      &-item {
        .icon {
          border-color: var(--content-border-color);
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
