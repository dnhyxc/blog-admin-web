import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import router from '@/router';
import App from './App.vue';
import store from './store';
import './style.css';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

// 创建vue实例
const app = createApp(App);

// 挂载pinia
app.use(store);

// 挂在路由
app.use(router);

// 国际化配置
app.use(ElementPlus, {
  locale: zhCn,
});

// element-plus 全局配置
app.use(ElementPlus, { size: 'default', zIndex: 3000 });

// 挂载 v-md-deitor
app.use(VueMarkdownEditor);

// 挂载实例
app.mount('#app');
