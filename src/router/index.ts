import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store/user';
import { AUTH_CONFIG } from '@/constant';

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
        path: '/users',
        name: 'users',
        meta: {
          title: '后台账号',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/users/index.vue'),
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
        path: '/pageSet',
        name: 'pageSet',
        meta: {
          title: '主题设置',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/pageSet/index.vue'),
      },
      {
        path: '/setting',
        name: 'setting',
        meta: {
          title: '账号设置',
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import('@/views/setting/index.vue'),
      },
    ],
    redirect: { name: 'home' },
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: '文章详情',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/views/detail/index.vue'),
  },
  {
    path: '/bind',
    name: 'bind',
    meta: {
      title: '账号绑定',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/views/bind/index.vue'),
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
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // 判断有没有登录
  if (!userStore.token) {
    if (to.name === 'login') {
      next();
    } else {
      router.push('/login');
    }
    // 如果不是超级管理员，禁止访问后台账户管理
  } else {
    if (userStore.auth === AUTH_CONFIG.SUPER) {
      next();
    } else {
      if (to.name === 'users' || to.name === 'account') {
        if (userStore.auth === AUTH_CONFIG.ADMIN) {
          router.push('/home');
        } else {
          router.push('/article');
        }
      } else {
        if (userStore.bindAccount?.length) {
          to.name === 'bind' ? router.push('/article') : next();
        } else {
          to.name === 'bind' ? next() : router.push('/bind');
        }
      }
    }
  }
});

export default router;
