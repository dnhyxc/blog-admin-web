import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import VueMarkdownEditor from '@kangc/v-md-editor';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 预览html配置
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';

// 预览mackdown配置
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

import Prism from 'prismjs';
import hljs from 'highlight.js';
import router from '@/router';
import App from './App.vue';
import store from './store/initStore';

import './style.less';

// 编辑mackdown配置
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  Hljs: hljs,
});

// 预览mackdown配置
VMdPreview.use(vuepressTheme, {
  Hljs: hljs,
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

// 挂载 v-md-deitor 编辑器
app.use(VueMarkdownEditor);
// 挂载预览 html 中间件
app.use(VMdPreviewHtml);
// 挂载预览 mackdown 中间件
app.use(VMdPreview);

// 挂载实例
app.mount('#app');
