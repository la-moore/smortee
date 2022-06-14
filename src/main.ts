import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import marked from './plugins/marked'
import './index.css'

const app = createApp(App)

app.use(marked)

app.use(router)
app.mount('#app')
