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
  //background: #010201 radial-gradient(50% 50% at 50% 50%, #28C629 0%, #BDFF00 100%);
  background: #010201;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  padding-top: 0;
  z-index: 1;
  &:before {
    display: block;
    content: ' ';
    width: 4000vw;
    height: 200vh;
    background: url('@/assets/img/gradient.png') no-repeat fixed bottom;
    //filter: blur(163.7px);
    position: absolute;
    top: 90vh;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
  }
  &.main {
    overflow: hidden;
  }
}
</style>
