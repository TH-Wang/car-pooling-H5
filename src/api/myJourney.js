import axios from './http'

export default { selectMyPassenger, selectByPassengerDriverDetail }

// 查询我的行程
function selectMyPassenger (params) {
  return axios({
    url: '/myJourney/selectMyPassenger',
    method: 'POST',
    params
  })
}

// 查询司机的行程详情
function selectByPassengerDriverDetail (id) {
  return axios({
    url: '/myJourney/selectByPassengerDriverDetail',
    method: 'POST',
    params: { pprId: id }
  })
}
