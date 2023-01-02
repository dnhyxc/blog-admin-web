import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    name: 'main',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '数据管理',
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
    ],
    redirect: { name: 'home' },
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
  // 判断有没有登录
  if (!localStorage.getItem('token')) {
    if (to.name === 'login') {
      next();
    } else {
      router.push('login');
    }
  } else {
    next();
  }
});

export default router;
