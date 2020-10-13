import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import tabbarConfig from '@/configs/tabbar'
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
        component: Home,
        meta: { tabbar: true }
      },
      {
        path: '/group',
        name: 'Group',
        component: () => import(/* webpackChunkName: "CarpoolList" */ '@/views/Group.vue'),
        meta: { tabbar: true }
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
      },
      {
        path: '/common/group/nearby',
        name: 'NearbyGroup',
        component: () => import(/* webpackChunkName: "NearbyGroup" */ '@/views/NearbyGroup.vue')
      },
      {
        path: '/common/group/detail',
        name: 'GroupDetail',
        component: () => import(/* webpackChunkName: "GroupDetail" */ '@/views/GroupDetail.vue')
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
  // 根据路由判断当前tabbar页面
  if (to.meta.tabbar) {
    const idx = tabbarConfig.findIndex(i => i.path === to.path)
    store.commit('changeTabbar', idx)
  }

  console.warn(`跳转页面：[${to.path}]  路由名称：${to.name}`)
})

export default router
