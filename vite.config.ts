import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import {
//   createStyleImportPlugin,
//   ElementPlusResolve,
// } from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path';

export default defineConfig({
  base: './', // 打包路径
  plugins: [
    vue(),
    // createStyleImportPlugin({
    //   resolves:[
    //     ElementPlusResolve()
    //   ],
    //   libs: [
    //     // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
    //     {
    //       libraryName: 'element-plus',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //           return `element-plus/lib/theme-chalk/${name}.css`
    //       },
    //       ensureStyleFile: true // 忽略文件是否存在, 导入不存在的CSS文件时防止错误。
    //     },
    //   ],
    // }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8088, //启动端口
    hmr: {
      host: '127.0.0.1',
    },
    // 设置 https 代理
    // proxy: {
    //     '/api': {
    //         target: 'your https address',
    //         changeOrigin: true,
    //         rewrite: (path: string) => path.replace(/^\/api/, '')
    //     }
    // }
  },
  build: {
    // 设置最终构建的浏览器兼容目标
    target: 'es2015',
    // 构建后是否生成 source map 文件
    sourcemap: false,
    //  chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 2000,
    // 启用/禁用 gzip 压缩大小报告
    reportCompressedSize: false,
  },
});
