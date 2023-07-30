import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/pages/create.vue'),
    meta: {
      title: '新建存档',
    },
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/pages/list.vue'),
    meta: {
      title: '搜索存档',
    },
  },
  {
    path: '/detail/:id',
    name: 'deatil',
    component: () => import('@/pages/detail.vue'),
    meta: {
      title: '存档详情',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/about.vue'),
    meta: {
      title: '关于',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

NProgress.configure({
  showSpinner: false,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = `${to.meta.title} - 网页存档`;
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
