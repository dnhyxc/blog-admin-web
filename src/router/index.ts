import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      title: '文章管理',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/article/index.vue'),
  },
  {
    path: '/classify',
    name: 'classify',
    meta: {
      title: '分类管理',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/classify/index.vue'),
  },
  {
    path: '/tag',
    name: 'tag',
    meta: {
      title: '标签管理',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/tag/index.vue'),
  },
  {
    path: '/account',
    name: 'account',
    meta: {
      title: '账号管理',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/account/index.vue'),
  },
  {
    path: '/comment',
    name: 'comment',
    meta: {
      title: '留言管理',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/comment/index.vue'),
  },
  {
    path: '/create',
    name: 'create',
    meta: {
      title: '发布文章',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/create/index.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '主题设置',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/setting/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/views/login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
