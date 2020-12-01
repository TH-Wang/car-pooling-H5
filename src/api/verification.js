import axios from './http'

export default {
  userIdentityCard,
  userDrivingCard,
  userCarVerification,
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

// 获取用户认证的车辆信息
function userCarDetail () {
  return axios.post('/verification/userCarDetail')
}
