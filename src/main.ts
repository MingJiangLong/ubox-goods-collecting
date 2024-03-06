import { createApp } from "vue"
import "./style.css"
import "vant/lib/index.css"
import "amfe-flexible"
import App from "./App.vue"
import register from "./util/register"
import { eventBus } from "simple-jseventbus"
const app = createApp(App)
window.completeScan = (value: string) => {
  eventBus.emit("goods-face-collect-receive-scan-result", value)
}

// setTimeout(()=>{
//   eventBus.emit("receive-scan-result", "it's truly love")
// },3000)

register(app)
app.mount("#app")
