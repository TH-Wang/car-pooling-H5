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
        component: () => import(
          /* webpackChunkName: "ModifyPhone" */ '@/views/ModifyPhone.vue'
        )
      },
      { // 信息通知详情
        path: '/common/notify/detail',
        name: 'NotifyDetail',
        component: () => import(
          /* webpackChunkName: "NotifyDetail" */ '@/views/NotifyDetail.vue'
        )
      },
      { // 我的分享邀请
        path: '/common/my/share',
        name: 'MyShare',
        component: () => import(/* webpackChunkName: "MyShare" */ '@/views/MyShare.vue')
      },
      { // 我的邀请记录
        path: '/common/my/share/history',
        name: 'MyShareHistory',
        component: () => import(
          /* webpackChunkName: "MyShareHistory" */ '@/views/MyShareHistory.vue'
        )
      },
      { // 设置
        path: '/common/setting',
        name: 'Setting',
        component: () => import(/* webpackChunkName: "Setting" */ '@/views/Setting/index.vue')
      },
      { // 身份证认证
        path: '/common/auth/idcard',
        name: 'AuthIDcard',
        component: () => import(
          /* webpackChunkName: "AuthIDcard" */ '@/views/Setting/AuthIDcard.vue'
        )
      },
      { // 我的行程
        path: '/common/my/trip',
        name: 'MyTrip',
        component: () => import(/* webpackChunkName: "MyTrip" */ '@/views/MyTrip/index.vue')
      },
      { // 乘客的行程详情
        path: '/common/tripinfo/customer',
        name: 'CustomerTripInfo',
        component: () => import(
          /* webpackChunkName: "CustomerTripInfo" */ '@/views/MyTrip/CustomerTripInfo.vue'
        )
      },
      { // 车主的行程详情
        path: '/common/tripinfo/driver',
        name: 'DriverTripInfo',
        component: () => import(
          /* webpackChunkName: "DriverTripInfo" */ '@/views/MyTrip/DriverTripInfo.vue'
        )
      },
      { // 车主行程的乘客信息
        path: '/common/my/custinfo',
        name: 'MyCustInfo',
        component: () => import(
          /* webpackChunkName: "MyCustInfo" */ '@/views/MyTrip/MyCustInfo.vue'
        )
      },
      { // 车主分享行程信息
        path: '/common/tripshare/driver',
        name: 'DriverTripShare',
        component: () => import(
          /* webpackChunkName: "DriverTripShare" */ '@/views/MyTrip/DriverTripShare.vue'
        )
      },
      { // 乘客分享行程信息
        path: '/common/tripshare/customer',
        name: 'CustomerTripShare',
        component: () => import(
          /* webpackChunkName: "CustomerTripShare" */ '@/views/MyTrip/CustomerTripShare.vue'
        )
      },
      { // 我的订单
        path: '/common/my/order',
        name: 'MyOrder',
        component: () => import(/* webpackChunkName: "MyOrder" */ '@/views/MyOrder/index.vue')
      },
      { // 我的旅游订单详情
        path: '/common/my/order/tour',
        name: 'TourOrderDetail',
        component: () => import(
          /* webpackChunkName: "TourOrderDetail" */ '@/views/MyOrder/TourOrderDetail.vue'
        )
      },
      { // 我的包车订单详情
        path: '/common/my/order/car',
        name: 'CarOrderDetail',
        component: () => import(
          /* webpackChunkName: "CarOrderDetail" */ '@/views/MyOrder/CarOrderDetail.vue'
        )
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
