import axios from './http'

export default {
  createTourCarOrder,
  getTourCarOrderList,
  getTourCarOrderDetail,
  getPrepayId
}

// 生成旅游包车订单
function createTourCarOrder (data) {
  return axios.post('/carOrder/createCarOrder', data)
}

// 查询订单列表
function getTourCarOrderList (params) {
  return axios({
    url: '/carOrder/queryCarOrder',
    method: 'POST',
    params
  })
}

// 查询订单详情
function getTourCarOrderDetail (id) {
  return axios({
    url: '/carOrder/queryByOrderId',
    method: 'POST',
    params: { id }
  })
}

// 获取支付id
function getPrepayId () {
  return ''
}
