<script setup>
import { onMounted, ref } from 'vue'
import debounce from 'lodash/debounce.js'
import { coinStore } from '@/store/coin.js'

const nums = ref([])
const coinButton = ref(null)

function animateNums(e) {
  if (coinButton.value.classList.contains('animated'))
    coinButton.value.classList.remove('animated')

  coinButton.value.classList.remove('loaded')
  const pos = coinButton.value.getBoundingClientRect()

  coinButton.value.classList.add('animated')

  nums.value.push({
    x: e.touches[0].clientX - pos.left,
    y: e.touches[0].clientY - pos.top,
    show: true,
  })
  setTimeout(() => {
  }, 1000)
}
function animateNumsEnd(i) {
  nums.value[i].show = false
}
const isLoaded = debounce(() => {
  coinButton.value.classList.add('loaded')
  coinButton.value.classList.add('active')
}, 1000)

onMounted(() => {
  isLoaded()
})
</script>

<template>
  <div class="root-coin-button">
    <div ref="coinButton" class="coin-button" @touchstart="animateNums">
      <transition v-show="coinStore().dayLimit === 995">
        <span class="slide-in-fwd-center">
          +1000
          <div class="icon icon-energy" />
        </span>
      </transition>
      <transition v-for="(val, i) in nums">
        <span
          v-if="val.show === true && coinStore().dayLimit > 995"
          :ref="`num-${i}`"
          class="num"
          :style="{ top: `${val.y}px`, left: `${val.x}px` }"
          @animationend="animateNumsEnd(i)"
        >
          +1
        </span>
      </transition>
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
    position: relative;
    cursor: pointer;
    opacity: 0;
    outline: none;
    user-select: none;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
    max-width: 330px;
    max-height: 330px;
    width: 100%;
    aspect-ratio : 1 / 1;
    &:before {
      display: block;
      content: ' ';
      position: absolute;
      background-size: contain;
      background-image: url('@/assets/img/0001.png');
      background-repeat: no-repeat;
      background-position-x: 8px;
      z-index: 1;
      max-height: 367px;
      width: 100%;
      aspect-ratio : 1 / 1;

      user-select: none;
      touch-action: none;
    }
    &:after {
      display: none;
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
  @include font-style($font-size: 30px, $font-weight: 800, $color: #fff);
  //display: none;
  position: absolute;
  z-index: 9;
  border-radius: 50%;
  transform: translateX(-100%) translateY(-100%);
  mix-blend-mode: screen;
  animation: slide-out-top 2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both, fade 1500ms ease-out both;
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
  }
  100% {
    transform: translateY(-80vh);
  }
}

@keyframes fade {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}

.slide-in-fwd-center {
  @include flex(row, space-between, center);
  @include font-style($font-size: 30px, $font-weight: 800, $color: #fff);
  position: absolute;
  z-index: 9;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: slide-in-fwd-center 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes slide-in-fwd-center {
  0% {
    transform: translate(-50%, -50%)  scale(0);
    opacity: 0;
  }
  10% {
    transform: translate(-50%, -50%)  scale(1);
    opacity: 0.2;
  }
  20% {
    transform: translate(-50%, -50%)  scale(2);
    opacity: 0.4;
  }
  30% {
    transform: translate(-50%, -50%)  scale(3);
    opacity: 0.6;
  }
  40% {
    transform: translate(-50%, -50%)  scale(4);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(5);
    opacity: 1;
  }
  60% {
    transform: translate(-50%, -50%) scale(6);
    opacity: 0.8;
  }
  70% {
    transform: translate(-50%, -50%) scale(7);
    opacity: 0.6;
  }
  80% {
    transform: translate(-50%, -50%) scale(8);
    opacity: 0.4;
  }
  90% {
    transform: translate(-50%, -50%) scale(9);
    opacity: 0.2;
  }
  100% {
    transform: translate(-50%, -50%) scale(10);
    opacity: 0;
  }
}
</style>
