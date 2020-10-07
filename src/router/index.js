import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layout/basic'
import CommonLayout from '@/layout/common'
import Home from '@/views/Home'
import CarpoolList from '@/views/CarpoolList'
import PendingList from '@/views/PendingList'
import HitchhikeList from '@/views/HitchhikeList'
import OrderDetail from '@/views/OrderDetail'
import SelectCity from '@/views/SelectCity'

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
        component: CarpoolList
      },
      {
        path: '/common/pending/list',
        name: 'PendingList',
        component: PendingList
      },
      {
        path: '/common/hitchhike/list',
        name: 'HitchhikeList',
        component: HitchhikeList
      },
      {
        path: '/common/order/detail',
        name: 'OrderDetail',
        component: OrderDetail
      },
      {
        path: '/common/city',
        name: 'SelectCity',
        component: SelectCity
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
