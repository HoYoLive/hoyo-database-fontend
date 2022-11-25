import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: '主 页',
    path: '/',
    meta: {
      title: '主页 - HoYoLive 数据库'
    },
    component: () => import('@/views/index/IndexView.vue')
  },
  {
    name: '字幕搜索',
    path: '/search',
    meta: {
      title: '字幕搜索 - HoYoLive 数据库'
    },
    component: () => import('@/views/search/SearchView.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/database/'), // process.env.BASE_URL
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title as string
})

export default router
