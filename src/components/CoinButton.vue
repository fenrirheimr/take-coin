<script setup>
import { onMounted, ref } from 'vue'
import debounce from 'lodash/debounce.js'

const nums = ref([])
const coinButton = ref(null)

function animateNums(e) {
  coinButton.value.classList.remove('loaded')
  coinButton.value.classList.add('active')
  const pos = coinButton.value.getBoundingClientRect()

  coinButton.value.classList.add('animated')
  nums.value.push({
    x: e.clientX - pos.left,
    y: e.clientY - pos.top,
    show: true,
  })
}
function animateNumsEnd(i) {
  nums.value[i].show = false
  coinButton.value.classList.remove('animated')
}
const isLoaded = debounce(() => {
  coinButton.value.classList.add('loaded')
}, 500)

onMounted(() => {
  isLoaded()
})

</script>

<template>
  <div ref="coinButton" class="root-coin-button" @click="animateNums">
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
</template>

<style scoped lang="scss">
.root-coin-button {
  @include flex(row, center, center);
  position: relative;
  margin-top: 40px;
  min-width: 367px;
  min-height: 367px;
  width: 70%;
  aspect-ratio : 1 / 1;
  //height: 80vw;
  cursor: pointer;
  opacity: 0;
  background-size: contain;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background-image: url('@/assets/img/0001.png');
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
    opacity: 1;
    animation: rotate-in-diag 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
  &.animated {
    animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  }
}

@keyframes rotate-in-diag {
  0% {
    transform: rotate3d(1, 1, 0, -360deg);
    opacity: 0;
  }
  100% {
    transform: rotate3d(1, 1, 0, 0deg);
    opacity: 1;
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
