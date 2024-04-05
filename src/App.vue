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
// let tg2 = window.Telegram.WebView; //получаем объект webapp телеграма

tg.expand() // расширяем на все окно/
// tg.isClosingConfirmationEnabled = true;
// tg.isClosingConfirmationEnabled = true;
// tg.initData //получаем данные от пользователя в виде строки (работает только при запуске из меню команд бота).
// tg.initDataUnsafe // получаем данные от пользователя в виде объекта (работает только при запуске из меню команд бота).
// tg.isExpanded // возвращает true, если приложение открыто на всю высоту, false - если нет.
// tg.viewportHeight // вернёт ширину окна.
// tg.sendData(data) // отправляет данные  боту в строковом виде, после чего закрывает приложение (работает только если приложение запущено с keyboard button).
// tg.ready() // метод позволяет отследить, когда приложение готово к отображению.
// tg.expand() // метод позволяет растянуть окно на всю высоту.
// tg.close() // метод закрывает приложение.

tg.headerColor = '#010201'

passportStore().userAuth()
// const id = '286133104'
// const id = '2'
// passportStore().setTgUserId(id)
// userStore().loadReferrals(id)
passportStore().setTgUserId(tg?.initDataUnsafe?.user?.id)
userStore().loadReferrals(tg?.initDataUnsafe?.user?.id)
// console.log(">>>", tg)


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
  min-height: 100%;
  height: 100%;
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
