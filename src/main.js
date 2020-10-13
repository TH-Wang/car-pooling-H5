import Vue from 'vue'
import App from './App.vue'
import { Dialog, Toast, Icon } from 'vant'
import './global.min.css'
import router from './router'
import store from './store'

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
