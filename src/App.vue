<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { passportStore } from '@/store/passport'

defineProps({
  title: String,
})

const tg = window.Telegram.WebApp
let userId;
onMounted(async () => {
  userId = tg?.initDataUnsafe?.user?.id || '2'
  const password = '111111'
  await passportStore().userAuth(userId, password)
})

const loc = useRoute()
const router = useRouter()
const currentRouter = ref(null)
const main = ref(null)


console.log('>>', tg)

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
    <div class="hidden"></div>
    <RouterView :key="loc.fullPath" />
  </main>
</template>

<style scoped lang="scss">
main {
  @include flex(column, center, center);
  position: relative;
  background: #010201 url('data:image/svg+xml,<svg width="393" height="843" viewBox="0 0 393 843" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(%23filter0_f_674_33)"><ellipse cx="196.192" cy="807" rx="658" ry="479" fill="url(%23paint0_radial_674_33)"/></g><defs><filter id="filter0_f_674_33" x="-789.208" y="0.600006" width="1970.8" height="1612.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="163.7" result="effect1_foregroundBlur_674_33"/></filter><radialGradient id="paint0_radial_674_33" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(196.192 807) rotate(90) scale(479 658)"><stop stop-color="%2328C629"/><stop offset="1" stop-color="%23BDFF00"/></radialGradient></defs></svg>') repeat-x fixed bottom;
  min-width: 393px; // TODO: убрать после
  max-width: 768px; // TODO: убрать после
  margin: 0 auto;
  min-height: 100%;
  padding-top: 0;
  &.main {
    overflow: hidden;
    min-height: 100%;
  }
  .hidden {
    display: none !important;
    background-image:
        url('@/assets/intro/0001.png'),
        url('@/assets/intro/0002.png'),
        url('@/assets/intro/0003.png'),
        url('@/assets/intro/0004.png'),
        url('@/assets/intro/0005.png'),
        url('@/assets/intro/0006.png'),
        url('@/assets/intro/0007.png'),
        url('@/assets/intro/0008.png'),
        url('@/assets/intro/0009.png'),
        url('@/assets/intro/0010.png'),
        url('@/assets/intro/0011.png'),
        url('@/assets/intro/0012.png'),
        url('@/assets/intro/0013.png'),
        url('@/assets/intro/0014.png'),
        url('@/assets/intro/0015.png'),
        url('@/assets/intro/0016.png'),
        url('@/assets/intro/0017.png'),
        url('@/assets/intro/0018.png'),
        url('@/assets/intro/0019.png'),
        url('@/assets/intro/0020.png'),
        url('@/assets/intro/0021.png'),
        url('@/assets/intro/0022.png'),
        url('@/assets/intro/0023.png'),
        url('@/assets/intro/0024.png'),
        url('@/assets/intro/0025.png'),
        url('@/assets/intro/0026.png'),
        url('@/assets/intro/0027.png'),
        url('@/assets/intro/0028.png'),
        url('@/assets/intro/0029.png'),
        url('@/assets/intro/0030.png'),
        url('@/assets/intro/0031.png'),
        url('@/assets/intro/0032.png'),
        url('@/assets/intro/0033.png'),
        url('@/assets/intro/0034.png'),
        url('@/assets/intro/0035.png'),
        url('@/assets/intro/0036.png'),
        url('@/assets/intro/0037.png'),
        url('@/assets/intro/0038.png'),
        url('@/assets/intro/0039.png'),
        url('@/assets/intro/0040.png'),
        url('@/assets/intro/0041.png'),
        url('@/assets/intro/0042.png'),
        url('@/assets/intro/0043.png'),
        url('@/assets/intro/0044.png'),
        url('@/assets/intro/0045.png'),
        url('@/assets/intro/0046.png'),
        url('@/assets/intro/0047.png'),
        url('@/assets/intro/0048.png'),
        url('@/assets/intro/0049.png'),
        url('@/assets/intro/0050.png'),
        url('@/assets/intro/0051.png'),
        url('@/assets/intro/0052.png'),
        url('@/assets/intro/0053.png');
  }
}
</style>
