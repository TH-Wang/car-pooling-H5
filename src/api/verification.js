import axios from './http'

export default { userIdentityCard, userDrivingCard, userCarVerification }

// 身份证认证
function userIdentityCard (data) {
  return axios.post('/verification/userIdentityCard', { carUserIdentityCard: data })
}

// 驾驶证认证
function userDrivingCard (data) {
  return axios.post('/verification/userDrivingCard', { carUserDrivingCard: data })
}

// 车辆认证
function userCarVerification (data) {
  return axios.post('/verification/userCarVerification', { carDetail: data })
}
