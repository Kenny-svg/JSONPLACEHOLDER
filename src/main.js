import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/route'
import 'flowbite'
import JwPagination from 'jw-vue-pagination';


const app = createApp(App)

app.use(JwPagination())
app.use(createPinia())
app.use(router).use
app.mount('#app')
