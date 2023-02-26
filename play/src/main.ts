import { createApp } from 'vue'
import 'virtual:svg-icons-register' // 引入 svg icon 注册脚本
import '@iceblink/theme-chalk/src/index.css'
import App from './App.vue'
import './assets/index.css'
import iconComponents from '@iceblink/svg-icons/src'

createApp(App)
  .use(iconComponents)
  .mount('#app')