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
        component: () => import(/* webpackChunkName: "Group" */ '@/views/Group.vue'),
        meta: { tabbar: true }
      },
      {
        path: '/release',
        name: 'Release',
        component: () => import(/* webpackChunkName: "Release" */ '@/views/Release/index.vue'),
        meta: { tabbar: true }
      },
      {
        path: '/notify',
        name: 'Notify',
        component: () => import(/* webpackChunkName: "Notify" */ '@/views/Notify.vue'),
        meta: { tabbar: true }
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import(/* webpackChunkName: "Mine" */ '@/views/Mine.vue'),
        meta: { tabbar: true }
      }
    ]
  },
  {
    path: '/common',
    name: 'CommonLayout',
    component: CommonLayout,
    children: [
      { // 短途拼车、城际拼车、跨省拼车
        path: '/common/carpool/list',
        name: 'CarpoolList',
        component: () => import(/* webpackChunkName: "CarpoolList" */ '@/views/CarpoolList.vue')
      },
      { // 车主找人
        path: '/common/pending/list',
        name: 'PendingList',
        component: () => import(/* webpackChunkName: "PendingList" */ '@/views/PendingList.vue')
      },
      { // 上下班拼车
        path: '/common/hitchhike/list',
        name: 'HitchhikeList',
        component: () => import(/* webpackChunkName: "HitchhikeList" */ '@/views/HitchhikeList.vue')
      },
      { // 顺路带物
        path: '/common/carry/list',
        name: 'CarryList',
        component: () => import(/* webpackChunkName: "CarryList" */ '@/views/CarryList.vue')
      },
      { // 订单详情页面
        path: '/common/order/detail',
        name: 'OrderDetail',
        component: () => import(/* webpackChunkName: "OrderDetail" */ '@/views/OrderDetail.vue')
      },
      { // 选择城市
        path: '/common/city',
        name: 'SelectCity',
        component: () => import(/* webpackChunkName: "SelectCity" */ '@/views/SelectCity.vue')
      },
      { // 附近的拼车群
        path: '/common/group/nearby',
        name: 'NearbyGroup',
        component: () => import(/* webpackChunkName: "NearbyGroup" */ '@/views/NearbyGroup.vue')
      },
      { // 拼车群详情页面
        path: '/common/group/detail',
        name: 'GroupDetail',
        component: () => import(/* webpackChunkName: "GroupDetail" */ '@/views/GroupDetail.vue')
      },
      { // 乘客预约订单
        path: '/common/reserve',
        name: 'Reserve',
        component: () => import(/* webpackChunkName: "Reserve" */ '@/views/Reserve.vue')
      },
      { // 修改手机号
        path: '/common/phone/modify',
        name: 'ModifyPhone',
        component: () => import(/* webpackChunkName: "ModifyPhone" */ '@/views/ModifyPhone.vue')
      },
      { // 我的行程
        path: '/common/my/trip',
        name: 'MyTrip',
        component: () => import(/* webpackChunkName: "MyTrip" */ '@/views/MyTrip/index.vue')
      },
      { // 我的行程
        path: '/common/my/order',
        name: 'MyOrder',
        component: () => import(/* webpackChunkName: "MyOrder" */ '@/views/MyOrder.vue')
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
