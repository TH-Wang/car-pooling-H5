import axios from './http'

export default {
  getCar,
  getCommonRoute,
  commitOrder,
  getOrdering,
  queryByOrderId,
  confirmOrder,
  getPublishDetail,
  driverOrder
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

// 根据id获取拼车单详情
function getPublishDetail (id) {
  return axios({
    url: '/order/getPublishDetail',
    method: 'POST',
    params: { id }
  })
}

// 司机查询乘客预约的订单
function driverOrder (params) {
  return axios({
    url: '/order/driverOrder',
    method: 'POST',
    params
  })
}
