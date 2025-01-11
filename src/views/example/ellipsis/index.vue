<!--
 * @Author: Komorebi
 * @Date: 2025-01-10 11:18:41
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-01-11 17:07:57
-->
<template>
  <div class="wrapper">
    <div class="wrapper-title h-8 font-size-6 lh-tight p-2 b-rd-4px">
      文本省略例子
    </div>
    <div class="wrapper-content mt-4 b-rd-4px overflow-hidden">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item title="单行溢出隐藏" name="1" class="w-100%">
          <div class="collapse-item-content single-row">
            {{ defaultText }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="多行溢出隐藏" name="2">
          <div class="collapse-item-content multi-row">
            {{ defaultText }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="基本使用2" name="3">
          <div
            class="collapse-item-content center-ellipsis"
            :title="defaultText"
          >
            {{ defaultText }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { storeToRefs } from "pinia";

defineOptions({ name: "TextEllipsis" });

const defaultText = `永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。
            此地有崇山峻岭，茂林修竹，又有清流激湍，映带左右，引以为流觞曲水，列坐其次。虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。
            是日也，天朗气清，惠风和畅。仰观宇宙之大，俯察品类之盛，所以游目骋怀，足以极视听之娱，信可乐也。
            夫人之相与，俯仰一世。或取诸怀抱，悟言一室之内；或因寄所托，放浪形骸之外。
            虽趣舍万殊，静躁不同，当其欣于所遇，暂得于己，快然自足，不知老之将至；及其所之既倦，情随事迁，感慨系之矣。
            向之所欣，俯仰之间，已为陈迹，犹不能不以之兴怀，况修短随化，终期于尽！古人云：“死生亦大矣。”岂不痛哉！
            每览昔人兴感之由，若合一契，未尝不临文嗟悼，不能喻之于怀。固知一死生为虚诞，齐彭殇为妄作。
            后之视今，亦犹今之视昔，悲夫！故列叙时人，录其所述，虽世殊事异，所以兴怀，其致一也。后之览者，亦将有感于斯文。
            `;

const activeCollapse = ref(["1", "2", "3"]);
/**
 * !bug:
 * !内容单行显示不下时, 点击展开按钮, 该展开项会变宽
 * !修复方式:对展开项设置一个宽度
 */
const collapseWidth = computed(() => {
  const { isCollapse } = storeToRefs(store.appSet);
  /**
   * * 侧边栏收起时 64px, 展开时 210px
   * * main 盒子的padding 是20px, 左右即 40px
   * * collapse-item的padding是6px, 左右即 12px
   */
  let _width = (isCollapse.value ? 64 : 210) + 40 + 12;
  return `calc(100vw - ${_width}px)`;
});
</script>

<style scoped lang="scss">
.wrapper {
  &-title {
    @include background_color("content-font-bg-color");
  }
  &-content {
    :deep(.el-collapse) {
      .el-collapse-item__header,
      .el-collapse-item__wrap {
        padding-left: 6px;
        padding-right: 6px;
      }
    }
    // 仅pc端生效
    @media (min-width: 768px) {
      .collapse-item-content {
        max-width: v-bind(collapseWidth);
      }
    }
    .collapse-item-content {
      &.single-row {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &.multi-row {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        /** 
        * 不写会多出一行
        */
        overflow: hidden;
      }
      &.center-ellipsis {
      }
    }
  }
}
</style>
