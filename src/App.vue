<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

let tg = window.Telegram.WebApp; //получаем объект webapp телеграма

tg.expand(); //расширяем на все окно

console.log('>>>', tg)

const loc = useRoute()
const router = useRouter()
const currentRouter = ref(null)
const main = ref(null)

watch(
    loc,
    () => {
      currentRouter.value = router.options.routes.filter(e => e.name !== loc.name)
    },
    { deep: true, immediate: true },
)
</script>

<template>
  <main ref="main" :class="{ main: loc.fullPath === '/' }">
    <RouterView :key="loc.fullPath" />
  </main>
<!--  <div>-->
<!--    asd-->
<!--  </div>-->
<!--  <HelloWorld msg="Vite + Vue" />-->
</template>

<style scoped lang="scss">
main {
  @include flex(row, center, center);
  //background: ;
  position: relative;
  background: #010201 url('data:image/svg+xml,<svg width="393" height="843" viewBox="0 0 393 843" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(%23filter0_f_674_33)"><ellipse cx="196.192" cy="807" rx="658" ry="479" fill="url(%23paint0_radial_674_33)"/></g><defs><filter id="filter0_f_674_33" x="-789.208" y="0.600006" width="1970.8" height="1612.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="163.7" result="effect1_foregroundBlur_674_33"/></filter><radialGradient id="paint0_radial_674_33" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(196.192 807) rotate(90) scale(479 658)"><stop stop-color="%2328C629"/><stop offset="1" stop-color="%23BDFF00"/></radialGradient></defs></svg>') no-repeat fixed bottom;
  max-width: 393px; // TODO: убрать после
  margin: 0 auto;
  min-height: 100%;
  &.main {
    overflow: hidden;
    min-height: 100%;
  }
}
</style>

