import '@/styles/_global.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTelegram from 'vue-tg'

// import cors from 'cors'
import router from './router'
import App from './App.vue'

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

const app = createApp(App)

app.use(VueTelegram)
app.use(createPinia())
app.use(router)
// app.use(cors(corsOptions))
app.mount('#app')
