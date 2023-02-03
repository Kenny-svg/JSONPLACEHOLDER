import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/route'
import 'flowbite'


const app = createApp(App)

app.use(createPinia())
app.use(router).use
app.mount('#app')
