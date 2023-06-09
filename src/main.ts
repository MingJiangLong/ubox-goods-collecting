import { createApp } from 'vue'
import './style.css'
import 'vant/lib/index.css'
import 'amfe-flexible'
import App from './App.vue'
import register from './util/register'
const app = createApp(App)
register(app)
app.mount('#app')
