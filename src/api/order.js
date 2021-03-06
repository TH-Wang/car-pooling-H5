import axios from './http'

export default {
  getCar,
  queryPassengerOrders,
  getCommonRoute,
  getPassengerCommonRoute,
  getNewPassengerCommonRoute,
  getFastLineCar,
  getFastLinePassengerCar,
  commitOrder,
  getOrdering,
  queryByOrderId,
  confirmOrder,
  getPublishDetail,
  getPassengerPublishDetail,
  driverOrder,
  appointmentPassenger
}

// 按条件找车
function getCar (carVo) {
  return axios.post('/order/getNewCar', carVo)
}

// 车主找人
function queryPassengerOrders (data) {
  return axios.post('/order/queryNewPassengerOrders', data)
}

// 获取乘客常用路线
function getCommonRoute (data) {
  return axios({
    url: '/order/getCommonRoute',
    method: 'POST',
    data
  })
}

// 车主找人快捷路线
function getPassengerCommonRoute (data) {
  return axios({
    url: '/order/getPassengerCommonRoute',
    method: 'POST',
    data
  })
}

// 新车主找人快捷路线
function getNewPassengerCommonRoute (data) {
  return axios.post('/order/getNewPassengerCommonRoute', data)
}

// 通过快捷路线搜索拼车列表
function getFastLineCar (params) {
  return axios({
    url: '/order/getFastLineCar',
    method: 'POST',
    params
  })
}

// 车主找人快捷路线搜索拼单列表
function getFastLinePassengerCar (params) {
  return axios({
    url: '/order/getFastLinePassengerCar',
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

// 根据id获取司机发布的拼车单详情
function getPublishDetail (id) {
  return axios({
    url: '/order/getPublishDetail',
    method: 'POST',
    params: { id }
  })
}

// 查询乘客发布的详情
function getPassengerPublishDetail (id) {
  return axios({
    url: '/order/getPassengerPublishDetail',
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

// 车主预约乘客
function appointmentPassenger (orderId) {
  return axios({
    url: '/order/appointmentPassenger',
    method: 'POST',
    params: { orderId }
  })
}
