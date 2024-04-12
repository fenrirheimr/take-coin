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

  // if ( 150 >= Math.sqrt( Math.pow( e.touches[0].clientX - pos.left, 2 ) + Math.pow( e.touches[0].clientY - pos.top, 2 ) ) ) {
  //   console.log('inside')
  // }
  // let centerX = e.touches[0].offsetLeft + e.touches[0].offsetWidth / 2;
  // let centerY = e.touches[0].offsetTop + e.touches[0].offsetHeight / 2;
  //
  // console.log('inside', e.touches[0])
  // console.log('inside', centerX, centerY)

  nums.value.push({
    x: e.touches[0].clientX - pos.left,
    y: e.touches[0].clientY - pos.top,
    show: true,
  })
  setTimeout(() => {
  }, 550)
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
      <transition v-for="(val, i) in nums">
      <span
          v-if="val.show === true"
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
    max-width: 340px;
    max-height: 340px;
    width: 100%;
    aspect-ratio : 1 / 1;
    &:before {
      display: block;
      content: ' ';
      position: absolute;
      background-size: contain;
      background-image: url('@/assets/img/0001.png');
      z-index: 1;

      max-width: 367px;
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
  animation: slide-out-top 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both, fade 700ms ease-out both;
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
    transform: translateY(-70vh);
  }
}

@keyframes fade {
  0%   { opacity: 1; }
  100% { opacity: 0; }
}
</style>
