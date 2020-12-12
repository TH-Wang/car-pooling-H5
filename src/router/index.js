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
        meta: { tabbar: true, keepAlive: true }
      },
      {
        path: '/group',
        name: 'Group',
        component: () => import(/* webpackChunkName: "Group" */ '@/views/Group/index.vue'),
        meta: { tabbar: true, keepAlive: true }
      },
      {
        path: '/release',
        name: 'Release',
        component: () => import(/* webpackChunkName: "Release" */ '@/views/Release/index.vue'),
        meta: { tabbar: true, keepAlive: true }
      },
      {
        path: '/notify',
        name: 'Notify',
        component: () => import(/* webpackChunkName: "Notify" */ '@/views/Notify.vue'),
        meta: { tabbar: true, keepAlive: true }
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import(/* webpackChunkName: "Mine" */ '@/views/Mine.vue'),
        meta: { tabbar: true, keepAlive: true }
      }
    ]
  },
  {
    path: '/common',
    name: 'CommonLayout',
    component: CommonLayout,
    children: [
      { // 登录
        path: '/common/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue')
      },
      { // 短途拼车、城际拼车、跨省拼车
        path: '/common/carpool/list',
        name: 'CarpoolList',
        component: () => import(
          /* webpackChunkName: "CarpoolList" */ '@/views/OrderList/Carpool.vue'
        )
      },
      { // 发布添加途径点
        path: '/common/passpoint',
        name: 'PassPoint',
        component: () => import(
          /* webpackChunkName: "PassPoint" */ '@/views/Release/PassPoint.vue'
        )
      },
      { // 车主找人
        path: '/common/pending/list',
        name: 'PendingList',
        component: () => import(
          /* webpackChunkName: "PendingList" */ '@/views/OrderList/Pending.vue'
        )
      },
      { // 上下班拼车
        path: '/common/hitchhike/list',
        name: 'HitchhikeList',
        component: () => import(
          /* webpackChunkName: "HitchhikeList" */ '@/views/OrderList/Hitchhike.vue'
        )
      },
      { // 顺路带物
        path: '/common/carry/list',
        name: 'CarryList',
        component: () => import(
          /* webpackChunkName: "CarryList" */ '@/views/OrderList/Carry.vue'
        )
      },
      { // 快捷线路列表
        path: '/common/quick/list',
        name: 'QuickList',
        component: () => import(/* webpackChunkName: "QuickList" */ '@/views/QuickList.vue')
      },
      { // 线路搜索结果列表
        path: '/common/searchline/list',
        name: 'SearchLineList',
        component: () => import(
          /* webpackChunkName: "SearchLineList" */ '@/views/SearchLineList.vue'
        )
      },
      { // 订单详情页面
        path: '/common/order/detail',
        name: 'OrderDetail',
        meta: { keepAlive: true },
        component: () => import(/* webpackChunkName: "OrderDetail" */ '@/views/OrderDetail.vue')
      },
      { // 旅游包车
        path: '/common/tourcar',
        name: 'TourCar',
        component: () => import(/* webpackChunkName: "TourCar" */ '@/views/TourCar/index.vue')
      },
      { // 旅游路线详情信息
        path: '/common/tour/detail',
        name: 'TourDetail',
        component: () => import(
          /* webpackChunkName: "TourDetail" */ '@/views/TourCar/TourDetail.vue'
        )
      },
      { // 包车详情信息
        path: '/common/car/detail',
        name: 'CarDetail',
        component: () => import(
          /* webpackChunkName: "CarDetail" */ '@/views/TourCar/CarDetail.vue'
        )
      },
      { // 旅游包车下单
        path: '/common/tourcar/placeorder',
        name: 'PlaceOrder',
        component: () => import(
          /* webpackChunkName: "PlaceOrder" */ '@/views/TourCar/PlaceOrder.vue'
        )
      },
      { // 旅游产品下单成功
        path: '/common/tour/feedback/success',
        name: 'TourSuccess',
        component: () => import(
          /* webpackChunkName: "TourSuccess" */ '@/views/Feedback/TourSuccess.vue'
        )
      },
      { // 旅游产品下单失败
        path: '/common/tour/feedback/fail',
        name: 'TourFail',
        component: () => import(
          /* webpackChunkName: "TourFail" */ '@/views/Feedback/TourFail.vue'
        )
      },
      { // 包车下单成功
        path: '/common/car/feedback/success',
        name: 'CarSuccess',
        component: () => import(
          /* webpackChunkName: "CarSuccess" */ '@/views/Feedback/CarSuccess.vue'
        )
      },
      { // 包车下单失败
        path: '/common/car/feedback/fail',
        name: 'CarFail',
        component: () => import(
          /* webpackChunkName: "CarFail" */ '@/views/Feedback/CarFail.vue'
        )
      },
      { // 选择城市
        path: '/common/city',
        name: 'SelectCity',
        component: () => import(/* webpackChunkName: "SelectCity" */ '@/views/SelectCity.vue')
      },
      { // 搜索出发点位置
        path: '/common/search/pos/start',
        name: 'SearchPosStart',
        component: () => import(
          /* webpackChunkName: "SearchStartPos" */ '@/views/SearchPosStart.vue'
        )
      },
      { // 搜索目的地位置
        path: '/common/search/pos/end',
        name: 'SearchPosEnd',
        component: () => import(
          /* webpackChunkName: "SearchStartPos" */ '@/views/SearchPosEnd.vue'
        )
      },
      { // 附近的拼车群
        path: '/common/group/nearby',
        name: 'GroupNearby',
        component: () => import(
          /* webpackChunkName: "GroupNearby" */ '@/views/Group/GroupNearby.vue'
        )
      },
      { // 拼车群搜索页面
        path: '/common/group/search',
        name: 'GroupSearch',
        component: () => import(
          /* webpackChunkName: "GroupSearch" */ '@/views/Group/GroupSearch.vue'
        )
      },
      { // 按地区搜索拼车群
        path: '/common/group/area',
        name: 'GroupArea',
        component: () => import(
          /* webpackChunkName: "GroupArea" */ '@/views/Group/GroupArea.vue'
        )
      },
      { // 拼车群详情页面
        path: '/common/group/detail',
        name: 'GroupDetail',
        component: () => import(
          /* webpackChunkName: "GroupDetail" */ '@/views/Group/GroupDetail.vue'
        )
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
      { // 乘客预定成功
        path: '/common/order/feedback/success',
        name: 'OrderSuccess',
        component: () => import(
          /* webpackChunkName: "OrderSuccess" */ '@/views/Feedback/OrderSuccess.vue'
        )
      },
      { // 乘客预定失败
        path: '/common/order/feedback/fail',
        name: 'OrderFail',
        component: () => import(
          /* webpackChunkName: "OrderFail" */ '@/views/Feedback/OrderFail.vue'
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
      { // 驾驶证认证
        path: '/common/auth/license',
        name: 'AuthLicense',
        component: () => import(
          /* webpackChunkName: "AuthLicense" */ '@/views/Setting/AuthLicense.vue'
        )
      },
      { // 车辆认证
        path: '/common/auth/car',
        name: 'AuthCar',
        component: () => import(
          /* webpackChunkName: "AuthCar" */ '@/views/Setting/AuthCar.vue'
        )
      },
      { // 投诉建议
        path: '/common/suggest',
        name: 'Suggest',
        component: () => import(
          /* webpackChunkName: "Suggest" */ '@/views/Setting/Suggest.vue'
        )
      },
      { // 投诉建议的历史记录
        path: '/common/suggest/history',
        name: 'SuggestHistory',
        component: () => import(
          /* webpackChunkName: "SuggestHistory" */ '@/views/Setting/SuggestHistory.vue'
        )
      },
      { // 我的钱包
        path: '/common/my/trip',
        name: 'MyTrip',
        component: () => import(/* webpackChunkName: "MyTrip" */ '@/views/MyTrip/index.vue')
      },
      { // 我的预约
        path: '/common/my/appoint',
        name: 'MyAppoint',
        component: () => import(/* webpackChunkName: "MyAppoint" */ '@/views/MyAppoint/index.vue')
      },
      { // 乘客预约
        path: '/common/appoint',
        name: 'Appoint',
        component: () => import(/* webpackChunkName: "Appoint" */ '@/views/Appoint.vue')
      },
      { // 我的行程
        path: '/common/my/wallet',
        name: 'MyWallet',
        component: () => import(/* webpackChunkName: "MyWallet" */ '@/views/MyWallet/index.vue')
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
      },
      { // 申请入驻拼车群
        path: '/common/settle/group',
        name: 'SettleGroup',
        component: () => import(
          /* webpackChunkName: "SettleGroup" */ '@/views/Settle/Group.vue'
        )
      },
      { // 完成入驻拼车群的申请，添加客服微信
        path: '/common/settle/group/finish',
        name: 'SettleGroupFinish',
        component: () => import(
          /* webpackChunkName: "SettleGroupFinish" */ '@/views/Settle/GroupFinish.vue'
        )
      },
      { // 申请站长的权益介绍页
        path: '/common/settle/site/tips',
        name: 'SettleSiteTips',
        component: () => import(
          /* webpackChunkName: "SettleSiteTips" */ '@/views/Settle/SiteTips.vue'
        )
      },
      { // 申请站长
        path: '/common/settle/site',
        name: 'SettleSite',
        component: () => import(
          /* webpackChunkName: "SettleSite" */ '@/views/Settle/Site.vue'
        )
      },
      { // 申请站长的申请记录
        path: '/common/settle/site/history',
        name: 'SettleSiteHistory',
        component: () => import(
          /* webpackChunkName: "SettleSiteHistory" */ '@/views/Settle/SiteHistory.vue'
        )
      },
      { // 我是群主
        path: '/common/group/master',
        name: 'GroupMaster',
        component: () => import(
          /* webpackChunkName: "GroupMaster" */ '@/views/Manage/GroupMaster.vue'
        )
      },
      { // 我是站长
        path: '/common/site/master',
        name: 'SiteMaster',
        component: () => import(
          /* webpackChunkName: "SiteMaster" */ '@/views/Manage/SiteMaster.vue'
        )
      },
      { // 我是副站长
        path: '/common/site/submaster',
        name: 'SubSiteMaster',
        component: () => import(
          /* webpackChunkName: "SubSiteMaster" */ '@/views/Manage/SubSiteMaster.vue'
        )
      },
      { // 我的收益
        path: '/common/my/income',
        name: 'MyIncome',
        component: () => import(
          /* webpackChunkName: "MyIncome" */ '@/views/MyIncome.vue'
        )
      },
      { // 我的主页链接
        path: '/common/my/homelink',
        name: 'MyHomeLink',
        component: () => import(
          /* webpackChunkName: "MyHomeLink" */ '@/views/Manage/MyHomeLink.vue'
        )
      },
      { // 群主：管理群
        path: '/common/manage/group',
        name: 'ManageGroup',
        component: () => import(
          /* webpackChunkName: "ManageGroup" */ '@/views/Manage/ManageGroup.vue'
        )
      },
      { // 站长：管理副站长
        path: '/common/manage/subsite',
        name: 'ManageSubSite',
        component: () => import(
          /* webpackChunkName: "ManageSubSite" */ '@/views/Manage/ManageSubSite.vue'
        )
      },
      { // 站长：管理群主
        path: '/common/manage/groupmaster',
        name: 'ManageGroupMaster',
        component: () => import(
          /* webpackChunkName: "ManageGroupMaster" */ '@/views/Manage/ManageGroupMaster.vue'
        )
      },
      { // 规则说明页面
        path: '/common/description',
        name: 'Description',
        component: () => import(
          /* webpackChunkName: "Description" */ '@/views/Description.vue'
        )
      },
      { // 测试页面
        path: '/common/test',
        name: 'Test',
        component: () => import(
          /* webpackChunkName: "Test" */ '@/views/Test.vue'
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

// 全局前置钩子
router.beforeEach((to, from, next) => {
  // 如果去往首页并且未登录
  if (to.path !== '/common/login' && !localStorage.getItem('token')) {
    next({ path: '/common/login' })
    return
  }
  next()
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
