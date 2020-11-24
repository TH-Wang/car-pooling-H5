import axios from './http'

export default {
  getCar,
  getCommonRoute,
  commitOrder,
  getOrdering,
  queryByOrderId,
  confirmOrder
}

// 按条件找车
function getCar (carVo) {
  return axios.post('/order/getCar', carVo)
}

// 获取常用路线
function getCommonRoute (params) {
  return axios({
    url: '/order/getCommonRoute',
    method: 'POST',
    params
  })
}

// 乘客预定车辆
function commitOrder (data) {
  return axios.post('/order/commitOrder', data)
}

// 查询订单
function getOrdering (params) {
  return axios({
    url: '/order/getOrdering',
    method: 'POST',
    params
  })
}

// 通过id查询订单详情
function queryByOrderId (orderId) {
  return axios({
    url: '/order/queryByOrderId',
    method: 'POST',
    params: {
      orderId
    }
  })
}

// 修改订单状态（确认预约、取消预约）
function confirmOrder (params) {
  return axios({
    url: '/order/confirmOrder',
    method: 'POST',
    params
  })
}
