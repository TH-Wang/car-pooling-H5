import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layout/basic'
import CommonLayout from '@/layout/common'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BasicLayout',
    component: BasicLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      }
    ]
  },
  {
    path: '/common',
    name: 'CommonLayout',
    component: CommonLayout,
    children: [
      {
        path: '/common/carpool/list',
        name: 'CarpoolList',
        component: () => import(/* webpackChunkName: "CarpoolList" */ '@/views/CarpoolList.vue')
      },
      {
        path: '/common/pending/list',
        name: 'PendingList',
        component: () => import(/* webpackChunkName: "webpackChunkName" */ '@/views/PendingList.vue')
      },
      {
        path: '/common/hitchhike/list',
        name: 'HitchhikeList',
        component: () => import(/* webpackChunkName: "HitchhikeList" */ '@/views/HitchhikeList.vue')
      },
      {
        path: '/common/carry/list',
        name: 'CarryList',
        component: () => import(/* webpackChunkName: "CarryList" */ '@/views/CarryList.vue')
      },
      {
        path: '/common/order/detail',
        name: 'OrderDetail',
        component: () => import(/* webpackChunkName: "OrderDetail" */ '@/views/OrderDetail.vue')
      },
      {
        path: '/common/city',
        name: 'SelectCity',
        component: () => import(/* webpackChunkName: "SelectCity" */ '@/views/SelectCity.vue')
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局后置钩子
router.afterEach((to, from) => {
  console.warn(`跳转页面：[${to.path}]  路由名称：${to.name}`)
})

export default router
