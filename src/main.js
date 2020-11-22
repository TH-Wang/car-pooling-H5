import Vue from 'vue'
import App from './App.vue'
import { Dialog, Toast, Icon, NavBar, Empty } from 'vant'
import './global.min.css'
import router from './router'
import store from './store'
import 'moment/locale/zh-cn'

Vue.config.productionTip = false

// 全局弹出框
Dialog.setDefaultOptions({
  width: '2.80rem',
  confirmButtonColor: '#0AD593',
  className: 'dialog'
})
Vue.use(Dialog)
Toast.setDefaultOptions({
  duration: 1500
})
Vue.use(Toast)
Vue.use(Icon)
Vue.use(NavBar)
Vue.use(Empty)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
