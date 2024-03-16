import '@/styles/_global.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTelegram from 'vue-tg'
import router from './router'
import App from './App.vue'

let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
// let tg2 = window.Telegram.WebView; //получаем объект webapp телеграма

tg.expand(); //расширяем на все окно/

tg.headerColor = '#010201'

const app = createApp(App)

app.use(VueTelegram)
app.use(createPinia())
app.use(router)
app.mount('#app')
