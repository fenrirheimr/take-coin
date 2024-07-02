<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { passportStore } from '@/store/passport'
import { userStore } from '@/store/user.js'

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

// Ensure the document is scrollable
function ensureDocumentIsScrollable() {
  const isScrollable =
    document.documentElement.scrollHeight > window.innerHeight;
  // Check if the document is scrollable
  if (!isScrollable) {
    /*
    Set the document's height to 100 % of
    the viewport height plus one extra pixel
    to make it scrollable.
    */
    document.documentElement.style.setProperty(
      "height",
      "calc(100vh + 1px)",
      "important"
    );
  }
}

// Call ensureDocumentIsScrollable function when the entire page has loaded.
window.addEventListener("load", ensureDocumentIsScrollable);

// Prevent windwo.scrollY from becoming zero
function preventCollapse(event) {
  if (window.scrollY === 0) {
    window.scrollTo(0, 1);
  }
}

// Attach the above function to the touchstart event handler of the scrollable element
const scrollableElement = document.querySelector(".scrollable-element");
scrollableElement.addEventListener("touchstart", preventCollapse);

passportStore().userAuth()
// const id = '286133104'
// const id = '2'
const id = '245757214'
passportStore().setTgUserId(id)
userStore().loadReferrals(id)
// passportStore().setTgUserId(tg?.initDataUnsafe?.user?.id)
// userStore().loadReferrals(tg?.initDataUnsafe?.user?.id)
</script>

<template>
  <main ref="main">
    <RouterView v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </RouterView>
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
  overflow-y: scroll;
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
