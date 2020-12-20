import axios from 'axios'

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

export default axios
