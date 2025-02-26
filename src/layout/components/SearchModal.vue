<!--
 * @Author: Komorebi
 * @Date: 2025-02-24 15:35:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-26 16:45:52
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
        ref="searchInput"
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
      <div class="empty">
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
import { Search } from "@element-plus/icons-vue";
import { watchDebounced } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useModalInner } from "@/hooks/useModal";

const searchInput = ref();
const [registerModal] = useModalInner(() => {
  /**
   * * 为了避免在弹窗打开时，input 无法获取焦点
   * * 使用 nextTick 来确保 input 获取焦点
   */
  nextTick(() => {
    searchInput.value?.focus();
  });
});

const router = useRouter();
const routeList = router.getRoutes();
const searchList = routeList.flatMap((item) =>
  !item.meta.hidden && item.meta.title
    ? [{ meta: item.meta, name: item.name, children: item.children }]
    : []
);
console.log("🚀 ~ searchList:", searchList);
const keyword = ref("");
const resultList = ref([]);
const highlightIndex = ref(-1);

watchDebounced(
  keyword,
  (val) => {
    console.log(val, "change");
    highlightIndex.value = -1;
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
  console.log("onUnmounted");
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
