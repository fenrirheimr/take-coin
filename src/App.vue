<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { passportStore } from '@/store/passport'

defineProps({
  title: String,
})

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

console.log('loc', loc.fullPath, currentRouter)

const tg = window.Telegram.WebApp

passportStore().userAuth()
// const id = '286133104'
// passportStore().setTgUserId(id)
passportStore().setTgUserId(tg?.initDataUnsafe?.user?.id)

</script>

<template>
<!--  <main ref="main" :class="loc.fullPath === '/' ? 'main' : 'inner'">-->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <main ref="main" :class="{ inner: loc.fullPath !== '/'}">
        <component :is="Component" />
      </main>
    </transition>
  </router-view>

</template>

<style scoped lang="scss">
main {
  position: relative;
  background: #010201;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  padding-top: 0;
  z-index: 1;
  overflow: hidden;
  &:before {
    display: block;
    content: ' ';
    width: 100vw;
    height: 100vh;
    background: url('@/assets/img/gradient.png') no-repeat top center;
    position: absolute;
    top: 10vh;
    z-index: 0;
  }
  &.inner {
    &:before {
      display: block;
      content: ' ';
      width: 100vw;
      height: 100vh;
      background: url('@/assets/img/gradient-inner.png') no-repeat bottom center;
      background-size: contain;
      position: absolute;
      top: auto;
      bottom: 0;
      z-index: 0;
    }
  }
  //&.main {
  //  &:before {
  //    display: block;
  //    content: ' ';
  //    width: 100vw;
  //    height: 100vh;
  //    background: url('@/assets/img/gradient.png') no-repeat top center;
  //    position: absolute;
  //    top: 10vh;
  //    z-index: 0;
  //  }
  //}
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
