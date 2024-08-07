import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import VueMarkdownEditor from '@kangc/v-md-editor';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 预览mackdown配置
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

// 快捷复制
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

import Prism from 'prismjs';
import hljs from 'highlight.js';
import router from '@/router';
import App from './App.vue';
import store from './store/initStore';
import { mountDirectives } from '@/utils';
import '@/assets/iconfont/iconfont.css';
import './style.less';

// TODO: VueMarkdownEditor, VMdPreview use 的 配置必须放在 use vuepressTheme 之后，否者会导致配置不生效

// 编辑mackdown配置
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  Hljs: hljs,
});

// 快捷复制配置
VueMarkdownEditor.use(createCopyCodePlugin());

// 预览mackdown配置
VMdPreview.use(vuepressTheme, {
  Hljs: hljs,
  Prism,
});

// 为预览组件增加复制功能
VMdPreview.use(createCopyCodePlugin());

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
// 挂载预览 mackdown 中间件
app.use(VMdPreview);

// 挂载自定义指令
app.use(mountDirectives);

// 挂载实例
app.mount('#app');
