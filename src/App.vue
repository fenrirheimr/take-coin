<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { passportStore } from '@/store/passport'

defineProps({
  title: String,
})

const main = ref(null)

const tg = window.Telegram.WebApp

passportStore().userAuth()
// const id = '286133104'
// passportStore().setTgUserId(id)
passportStore().setTgUserId(tg?.initDataUnsafe?.user?.id)

</script>

<template>
  <main ref="main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
          <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped lang="scss">
main {
  background: #010201;
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  padding-top: 0;
  overflow: hidden;
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
