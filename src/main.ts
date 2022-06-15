import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import markdown from './plugins/markdown'
import api from './plugins/api'
import './index.css'

const app = createApp(App)

app.use(markdown)
app.use(api, {
  baseUrl: ''
})

app.use(router)
app.mount('#app')
