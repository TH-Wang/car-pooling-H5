import axios from './http'
import store from '@/store'

export default {
  sendCode,
  userCodeLogin,
  userRecommendLogin,
  getUserDetail,
  updateUserInfo,
  updatePhoneToOne,
  updatePhoneToTwo,
  getUserInviteQr
}

// 获取短信验证码
function sendCode ({ phone, type }) {
  return axios({
    url: '/smscode/sendCode',
    method: 'POST',
    params: { phone, type }
  })
}

// 用户验证码登录
function userCodeLogin ({ phone, code }) {
  return axios({
    url: '/user/userSmsCodeLogin',
    method: 'POST',
    params: { userPhone: phone, code }
  })
}

// 用户邀请登录
function userRecommendLogin ({ phone, code, invite }) {
  return axios({
    url: '/user/userRecommendLogin',
    method: 'POST',
    params: { userPhone: phone, code, recommendId: invite }
  })
}

// 获取用户个人信息
function getUserDetail () {
  const userId = store.state.user.info.id
  return axios.get(`/user/getUserDetail?userId=${userId}`)
}

// 修改个人信息
function updateUserInfo (params) {
  return axios({
    url: '/user/updateUserInfo',
    method: 'POST',
    params
  })
}

// 修改手机号第一步：获取验证码
function updatePhoneToOne (phone) {
  return axios({
    url: '/user/updatePhoneToOne',
    method: 'POST',
    params: { phone, code: '' }
  })
}

// 修改手机号第二步：验证新手机号和验证码
function updatePhoneToTwo (params) {
  return axios({
    url: '/user/updatePhoneToTwo',
    method: 'POST',
    params
  })
}

// 获取用户邀请码
function getUserInviteQr () {
  return axios.post('/user/getUserQr')
}
