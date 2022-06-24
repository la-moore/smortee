import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import markdown from './plugins/markdown'
import api from './plugins/api'
import './index.css'

const app = createApp(App)

app.use(markdown)
app.use(api, {
  // baseUrl: 'http://smortee-api.la-moore.ru',
  baseUrl: 'http://127.0.0.1:8000',
})

app.use(router)
app.mount('#app')
