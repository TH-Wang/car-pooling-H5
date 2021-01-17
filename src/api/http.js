import axios from 'axios'
import { Dialog } from 'vant'
import store from '@/store'
import router from '@/router'

// 不需要传token的请求
const safeUrl = [
  // user模块
  '/smscode/sendCode',
  '/user/userSmsCodeLogin',

  // position模块
  '/position/queryPositionForCity',
  '/position/queryPositionForCounty'
]

// 全局配置（线上）
axios.defaults.baseURL = 'http://39.102.65.132:8089'
// axios.defaults.baseURL = 'http://www.pinchezhijia.com'
// 域名
// axios.defaults.baseURL = 'http://www.pinchezhijia.com/api'
// 内网
// axios.defaults.baseURL = 'http://wangtao.utools.club/'

// 请求拦截器
axios.interceptors.request.use((config) => {
  if (safeUrl.indexOf(config.url) === -1) {
    config.headers.token = localStorage.getItem('token')
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use(function (res) {
  // 如果未登录
  if (res.data.status === -4) {
    Dialog.confirm({
      title: '未登录',
      message: '尊敬的用户，请您先完成登录！',
      confirmButtonText: '立即登录',
      cancelButtonText: '稍后再登'
    }).then(() => {
      router.push('/common/login')
    }).finally(() => {
      store.commit('clearToken')
    })
  }
  return res
})

export default axios
