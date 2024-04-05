<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { passportStore } from '@/store/passport'
import {userStore} from "@/store/user.js";

defineProps({
  title: String,
})

const main = ref(null)

const tg = window.Telegram.WebApp

passportStore().userAuth()
// const id = '286133104'
// const id = '2'
// passportStore().setTgUserId(id)
// userStore().loadReferrals(id)
passportStore().setTgUserId(tg?.initDataUnsafe?.user?.id)
userStore().loadReferrals(tg?.initDataUnsafe?.user?.id)
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
  //height: 100vh;
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
