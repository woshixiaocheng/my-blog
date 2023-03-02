import { createApp } from "vue";
import App from "./App.vue";
import router  from "./router";
import '@/permission'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/index.less'
import {createPinia} from 'pinia'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
const store=createPinia()
const app=createApp(App)
app.use(VMdEditor);
app.use(ElementPlus)
app.use(router)
app.use(store)


app.mount("#app");