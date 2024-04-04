<script setup>
import { onMounted, ref } from 'vue'
import debounce from 'lodash/debounce.js'

const nums = ref([])
const coinButton = ref(null)

function animateNums(e) {

  if (coinButton.value.classList.contains('animated')) {
    coinButton.value.classList.remove('animated')
  }
  coinButton.value.classList.remove('loaded')
  const pos = coinButton.value.getBoundingClientRect()

  coinButton.value.classList.add('animated')
  nums.value.push({
    x: e.touches[0].clientX - pos.left,
    y: e.touches[0].clientY - pos.top,
    show: true,
  })
  setTimeout(() => {

  }, 350)
}
function animateNumsEnd(i) {
  nums.value[i].show = false
}
const isLoaded = debounce(() => {
  coinButton.value.classList.add('loaded')
  coinButton.value.classList.add('active')
}, 500)

onMounted(() => {
  isLoaded()
})

</script>

<template>
  <div class="root-coin-button">
    <div class="coin-button" ref="coinButton" @touchstart="animateNums">
      <transition-group v-for="(val, i) in nums">
      <span
          v-if="val.show === true"
          :ref="`num-${i}`"
          class="num"
          :style="{ top: `${val.y}px`, left: `${val.x}px` }"
          @animationend="animateNumsEnd(i)"
      >
        +1
      </span>
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
.root-coin-button {
  @include flex(row, center, center);
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 367px;
  aspect-ratio : 1 / 1;
  margin-top: 5vh;
  user-select: none;

  .coin-button {
    //@include flex(row, center, center);
    position: relative;
    cursor: pointer;
    opacity: 0;
    outline: none;
    user-select: none;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
    max-width: 300px;
    max-height: 300px;
    width: 100%;
    aspect-ratio : 1 / 1;
    &:before {
      display: block;
      content: ' ';
      position: absolute;
      background-size: contain;
      background-image: url('@/assets/img/btn-yellow.png');
      z-index: 1;
      //border-radius: 50%;

      max-width: 367px;
      max-height: 367px;
      width: 100%;
      aspect-ratio : 1 / 1;

      user-select: none;
      touch-action: none;

      //box-shadow: 0 40px 270px 60px #fdb623;
    }
    &:after {
      display: block;
      content: ' ';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 0;
      border-radius: 50%;

      max-width: 367px;
      max-height: 367px;
      width: 80%;
      aspect-ratio : 1 / 1;

      user-select: none;
      touch-action: none;

      box-shadow: 0 40px 270px 60px #fdb623;
    }

    @media (max-height: 660px) {
      max-width: 280px;
      max-height: 280px;
    }
    @media (max-height: 680px) {
      max-width: 280px;
      max-height: 280px;
    }

    &:focus,
    &:active {
      outline: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    &.active {
      opacity: 1;
    }
    &.loaded {
      animation: rotate-scale-up-ver 0.65s linear both;
    }
    &.animated {
      &:before {
        animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
      }
    }
  }
}

@keyframes rotate-scale-up-ver {
  0% {
    opacity: 0;
    transform: scale(1) rotateY(0);
  }
  50% {
    opacity: .5;
    transform: scale(1.5) rotateY(180deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotateY(360deg);
  }
}

.num {
  @include font-style($font-size: 35px, $font-weight: 800, $color: #fff);
  position: absolute;
  z-index: 9;
  border-radius: 50%;
  transform: translateX(-100%) translateY(-100%);
  mix-blend-mode: screen;
  animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both, fade 500ms ease-out both;
}

@keyframes scale-up-center {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes slide-out-top {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  20% {
    opacity: .8;
  }
  50% {
    opacity: .5;
  }
  80% {
    opacity: .1;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}

@keyframes fade {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}
</style>
