import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import store from './store'
import router from '@/router';
import './style.css'

// 创建vue实例
const app = createApp(App)

// 挂载pinia
app.use(store)

// 挂在路由
app.use(router);

// element-plus 全局配置
app.use(ElementPlus, { size: 'default', zIndex: 3000 })

// 挂载实例
app.mount('#app');
