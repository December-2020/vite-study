<!--
 * @Author: Komorebi
 * @Date: 2025-02-24 15:35:02
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-02-25 15:39:33
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
        ref="searchInput"
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
            <span class="icon line-height-20px">Esc</span>
          </div>
          <div class="line-height-20px">{{ $t("Layout.search.close") }}</div>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useModalInner } from "@/hooks/useModal";

const searchInput = ref();
const [registerModal] = useModalInner(() => {
  searchInput.value?.focus()
  console.log("🚀 ~ searchInput:", );
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
          & + .icon {
            margin-left: 5px;
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
