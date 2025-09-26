<template>
  <div class="container position-absolute top-40% left-50% h-auto">
    <div class="http-404 flex position-relative w-100% overflow-hidden">
      <!-- float-left -->
      <div class="pic-404 position-relative overflow-hidden">
        <img
          src="@/assets/images/404.png"
          alt="404"
          class="pic-404__parent w-100%"
        />
        <img
          src="@/assets/images/404_cloud.png"
          alt="404"
          class="pic-404__child left"
        />
        <img
          src="@/assets/images/404_cloud.png"
          alt="404"
          class="pic-404__child middle"
        />
        <img
          src="@/assets/images/404_cloud.png"
          alt="404"
          class="pic-404__child right"
        />
      </div>
      <div class="bullshit position-relative float-left overflow-hidden">
        <div class="bullshit__oops font-size-32px font-bold op-0 mb-20px">
          {{ $t("404.title") }}
        </div>
        <div class="bullshit__info">
          <a style="color: #20a0ff" href="/" target="_blank">
            {{ $t("404.openNewPage") }}
          </a>
        </div>
        <div class="bullshit__headline font-size-20px font-bold op-0 mb-10px">
          {{ $t("404.notBeAccessed") }}
        </div>
        <div class="bullshit__info">{{ $t("404.tips") }}</div>
        <a href="/" class="bullshit__return-home">{{ $t("404.backButton") }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { ThemeEnum } from "@/enums/app";

defineOptions({ name: "404" });

onMounted(() => {
  const htmlEl = document.documentElement;
  const flag = store.appSet.isDarkTheme;
  htmlEl.classList.add(flag ? ThemeEnum.DARK : ThemeEnum.LIGHT);
  htmlEl.classList.remove(flag ? ThemeEnum.LIGHT : ThemeEnum.DARK);
});
</script>

<style lang="scss" scoped>
.container {
  transform: translate(-50%, -42%);
  .http-404 {
    display: flex;
    justify-content: center;
    align-items: center;
    // display: block;
    padding: 20px 0;
    box-sizing: border-box;
    .pic-404 {
      max-width: 640px;
      &__child {
        position: absolute;
        // animation-iteration-count: infinite;
        &.left {
          width: 80px;
          top: 17px;
          left: 220px;
          opacity: 0;
          animation-name: cloudLeft;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1s;
        }
        &.middle {
          width: 46px;
          top: 10px;
          left: 420px;
          opacity: 0;
          animation-name: cloudMid;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1.2s;
        }
        &.right {
          width: 62px;
          top: 100px;
          left: 500px;
          opacity: 0;
          animation-name: cloudRight;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
          animation-delay: 1s;
        }
        @keyframes cloudLeft {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }
          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }
          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }
          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }
        @keyframes cloudMid {
          0% {
            top: 10px;
            left: 420px;
            opacity: 0;
          }
          20% {
            top: 40px;
            left: 360px;
            opacity: 1;
          }
          70% {
            top: 130px;
            left: 180px;
            opacity: 1;
          }
          100% {
            top: 160px;
            left: 120px;
            opacity: 0;
          }
        }
        @keyframes cloudRight {
          0% {
            top: 100px;
            left: 500px;
            opacity: 0;
          }
          20% {
            top: 120px;
            left: 460px;
            opacity: 1;
          }
          80% {
            top: 180px;
            left: 340px;
            opacity: 1;
          }
          100% {
            top: 200px;
            left: 300px;
            opacity: 0;
          }
        }
      }
      &::after {
        content: "";
        clear: both;
        display: block;
      }
    }
    .bullshit {
      // border: solid 1px orange;
      padding: 30px 20px;
      max-width: 320px;
      &__oops {
        line-height: 40px;
        color: #1482f0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      &__headline {
        line-height: 24px;
        // color: #222;
        color: var(--content-font-color);
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      &__info {
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        margin-bottom: 30px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      &__return-home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        background: #1482f0;
        border-radius: 100px;
        text-align: center;
        color: #ffffff;
        opacity: 0;
        font-size: 14px;
        line-height: 36px;
        cursor: pointer;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
      &::after {
        content: "";
        clear: both;
        display: block;
      }
    }
  }
  a {
    text-decoration: none;
  }
}

// 仅移动端生效
@media (max-width: 640px) {
  .http-404 {
    flex-direction: column;
    .pic-404 {
      padding: 0 14px;
      box-sizing: border-box;
      &__child {
        &.left {
          width: 40px !important;
          top: 2vw;
          left: 60vw;
        }
        &.middle {
          width: 23px !important;
          top: 1.5vw;
          left: 80vw;
        }
        &.right {
          width: 31px !important;
          top: 12vw;
          left: 85vw;
        }
      }
    }
    .bullshit {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @keyframes cloudLeft {
    0% {
      top: 2vw;
      left: 60vw;
      opacity: 0;
    }
    20% {
      top: 4vw;
      left: 50vw;
      opacity: 1;
    }
    80% {
      top: 10vw;
      left: 25vw;
      opacity: 1;
    }
    100% {
      top: 12vw;
      left: 15vw;
      opacity: 0;
    }
  }

  @keyframes cloudMid {
    0% {
      top: 1.5vw;
      left: 80vw;
      opacity: 0;
    }
    20% {
      top: 5vw;
      left: 68vw;
      opacity: 1;
    }
    70% {
      top: 16vw;
      left: 35vw;
      opacity: 1;
    }
    100% {
      top: 20vw;
      left: 25vw;
      opacity: 0;
    }
  }

  @keyframes cloudRight {
    0% {
      top: 12vw;
      left: 85vw;
      opacity: 0;
    }
    20% {
      top: 15vw;
      left: 75vw;
      opacity: 1;
    }
    80% {
      top: 22vw;
      left: 50vw;
      opacity: 1;
    }
    100% {
      top: 25vw;
      left: 40vw;
      opacity: 0;
    }
  }
}
</style>
