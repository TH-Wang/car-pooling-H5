import axios from './http'

export default {
  userIdentityCard,
  userDrivingCard,
  userCarVerification,
  userIdentity,
  userDriving,
  userCarDetail
}

// 身份证认证
function userIdentityCard (data) {
  return axios.post('/verification/userIdentityCard', data)
}

// 驾驶证认证
function userDrivingCard (data) {
  return axios.post('/verification/userDrivingCard', data)
}

// 车辆认证
function userCarVerification (data) {
  return axios.post('/verification/userCarVerification', data)
}

// 获取用户身份证认证信息
function userIdentity () {
  return axios.post('/verification/userIdentity')
}

// 获取用户驾驶证认证信息
function userDriving () {
  return axios.post('/verification/userDriving')
}

// 获取用户认证的车辆信息
function userCarDetail () {
  return axios.post('/verification/userCarDetail')
}
