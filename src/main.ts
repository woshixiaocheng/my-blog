import { createApp } from "vue";
import App from "./App.vue";
import router  from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/index.less'
import '@/assets/css/animation.css'
import {createPinia} from 'pinia'
const store=createPinia()
const app=createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount("#app");