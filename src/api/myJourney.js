import axios from './http'

export default {
  selectMyPassenger,
  selectMyJourney,
  selectByPassengerDriverDetail,
  selectByPassengerDetail,
  deleteJourneyById
}

// 查询车主的所有行程
function selectMyPassenger (params) {
  return axios({
    url: '/myJourney/selectMyPassenger',
    method: 'POST',
    params
  })
}

// 查询乘客的所有行程
function selectMyJourney (params) {
  return axios({
    url: '/myJourney/selectMyJourney',
    method: 'POST',
    params
  })
}

// 查询车主的行程详情
function selectByPassengerDriverDetail (id) {
  return axios({
    url: '/myJourney/selectByPassengerDriverDetail',
    method: 'POST',
    params: { pprId: id }
  })
}

// 查询乘客的行程详情
function selectByPassengerDetail (id) {
  return axios({
    url: '/myJourney/selectByPassengerDetail',
    method: 'POST',
    params: { pprId: id }
  })
}

// 删除我的行程
function deleteJourneyById (params) {
  return axios({
    url: '/myJourney/deleteById',
    method: 'POST',
    params
  })
}
