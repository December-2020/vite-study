<!--
 * @Author: Komorebi
 * @Date: 2025-07-18 14:07:04
 * @LastEditors: Komorebi
 * @LastEditTime: 2025-07-19 11:34:53
-->
<template>
  <div class="wrapper" ref="domRef">
    <div class="dancing-card">
      <span class="emoji">🕺💃</span>
      <div class="desc">I'm dancing and changing color!</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const domRef = ref();
defineExpose({ domRef });
</script>

<style scoped lang="scss">
@keyframes colorChange {
  0% {
    background: linear-gradient(90deg, #3ee8ff, #00e0ff);
  }
  40% {
    background: linear-gradient(90deg, #3ee8ff, #00e0ff);
  }
  50% {
    background: linear-gradient(90deg, #ffe259, #ffa751);
  }
  90% {
    background: linear-gradient(90deg, #ffe259, #ffa751);
  }
  100% {
    background: linear-gradient(90deg, #3ee8ff, #00e0ff);
  }
}

@keyframes bounceScaleCard {
  0%,
  100% {
    transform: translateY(0) scale(1) rotate(-1deg);
    box-shadow: 0 4px 24px 0 rgba(30, 42, 80, 0.12);
  }
  20% {
    transform: translateY(-18px) scale(1.02) rotate(1deg);
    box-shadow: 0 16px 32px 0 rgba(30, 42, 80, 0.18);
  }
  40% {
    transform: translateY(0) scale(1) rotate(-1deg);
    box-shadow: 0 4px 24px 0 rgba(30, 42, 80, 0.12);
  }
  60% {
    transform: translateY(-10px) scale(0.96) rotate(1deg);
    box-shadow: 0 8px 28px 0 rgba(30, 42, 80, 0.15);
  }
  80% {
    transform: translateY(0) scale(1) rotate(-1deg);
    box-shadow: 0 4px 24px 0 rgba(30, 42, 80, 0.12);
  }
}

@keyframes bounceEmoji {
  0%,
  100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-14px);
  }
  40% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-8px);
  }
  80% {
    transform: translateY(0);
  }
}

.wrapper {
  // background: var(--content-font-color);
  padding: 30px 20px;
  box-sizing: border-box;
  font-family: "Segoe UI", Arial, sans-serif;
  .dancing-card {
    // margin: 20px auto;
    padding: 20px 0;
    border-radius: 16px;
    box-shadow: 0 4px 16px 0 rgba(30, 42, 80, 0.12);
    text-align: center;
    transition: box-shadow 0.3s;
    animation: colorChange 3s linear infinite alternate,
      bounceScaleCard 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
    background: linear-gradient(90deg, #3ee8ff, #00e0ff);
    .emoji {
      display: inline-block;
      font-size: 1.6rem;
      /* emoji 独立上下跳动动画，和卡片略有错位更有趣 */
      animation: bounceEmoji 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
    }
    .desc {
      margin-top: 16px;
      font-size: 1.2rem;
      color: var(--content-font-bg-color);
      font-weight: 600;
    }
  }
}
</style>
