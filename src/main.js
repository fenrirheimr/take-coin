import '@/styles/_global.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTelegram from 'vue-tg'
import cors from 'cors'
import router from './router'
import App from './App.vue'

const tg = window.Telegram.WebApp // получаем объект webapp телеграма
// let tg2 = window.Telegram.WebView; //получаем объект webapp телеграма

tg.expand() // расширяем на все окно/

const corsOptions ={
  origin: 'http://localhost:5173',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

// tg.initData //получаем данные от пользователя в виде строки (работает только при запуске из меню команд бота).
// tg.initDataUnsafe // получаем данные от пользователя в виде объекта (работает только при запуске из меню команд бота).
// tg.isExpanded // возвращает true, если приложение открыто на всю высоту, false - если нет.
// tg.viewportHeight // вернёт ширину окна.
// tg.sendData(data) // отправляет данные  боту в строковом виде, после чего закрывает приложение (работает только если приложение запущено с keyboard button).
// tg.ready() // метод позволяет отследить, когда приложение готово к отображению.
// tg.expand() // метод позволяет растянуть окно на всю высоту.
// tg.close() // метод закрывает приложение.

tg.headerColor = '#010201'

const app = createApp(App)

app.use(VueTelegram)
app.use(createPinia())
app.use(router)
// app.use(cors(corsOptions))
app.mount('#app')
