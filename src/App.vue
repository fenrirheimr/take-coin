<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { passportStore } from '@/store/passport'

defineProps({
  title: String,
})

const tg = window.Telegram.WebApp

passportStore().userAuth()
// const id = '286133104'
// passportStore().setTgUserId(id)
passportStore().setTgUserId(tg?.initDataUnsafe?.user?.id)
onMounted(async () => {
  // await passportStore().userAuth()
  // const id = '286133104'
  // await passportStore().setTgUserId(id)
  // await passportStore().setTgUserId(tg?.initDataUnsafe?.user?.id)
})

const loc = useRoute()
const router = useRouter()
const currentRouter = ref(null)
const main = ref(null)

console.log('>>>', tg)

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
</template>

<style scoped lang="scss">
main {
  @include flex(column, center, flex-start);
  position: relative;
  background: #010201 url('data:image/svg+xml,<svg width="393" height="843" viewBox="0 0 393 843" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(%23filter0_f_674_33)"><ellipse cx="196.192" cy="807" rx="658" ry="479" fill="url(%23paint0_radial_674_33)"/></g><defs><filter id="filter0_f_674_33" x="-789.208" y="0.600006" width="1970.8" height="1612.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="163.7" result="effect1_foregroundBlur_674_33"/></filter><radialGradient id="paint0_radial_674_33" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(196.192 807) rotate(90) scale(479 658)"><stop stop-color="%2328C629"/><stop offset="1" stop-color="%23BDFF00"/></radialGradient></defs></svg>') repeat-x fixed bottom;
  min-width: 393px; // TODO: убрать после
  max-width: 768px; // TODO: убрать после
  margin: 0 auto;
  min-height: 100vh;
  height: 100vh;
  padding-top: 0;
  &.main {
    overflow: hidden;
  }
}
</style>
