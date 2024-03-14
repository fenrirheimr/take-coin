import '@/styles/_global.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTelegram from 'vue-tg'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(VueTelegram)
app.use(createPinia())
app.use(router)
app.mount('#app')
