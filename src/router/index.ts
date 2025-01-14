import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import GoodsSearchPage from '@/views/GoodsSearchPage.vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    component: GoodsSearchPage,
    meta: { title: "商品外观采集申请单" },
  },
  {
    path: '/apply',
    component: () => import('@/views/ApplyPage.vue'),
    meta: { title: "商品外观采集申请单" },
    name: 'Apply'
  },
  {
    path: '/apply-list',
    component: () => import('@/views/ApplyListPage.vue'),
    meta: { title: "审核列表" },
    name: 'ApplyList'
  },
  {
    path: '/apply-detail/:id',
    component: () => import('@/views/ApplyDetailPage.vue'),
    meta: { title: "审核详情" },
    name: 'ApplyDetail'
  },
  // {
  //   path: '/take-photo',
  //   component: () => import('@/views/Camera.vue'),
  //   meta: { title: "拍照" },
  //   name: 'TakePhoto'
  // },



]
const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(''),
  routes
})

router.beforeEach((to, _form, next) => {
  window.document.title = `${to.meta?.title ?? ''}`
  next()
})
export default router
