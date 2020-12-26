import axios from './http'

export default {
  insertPublish,
  inesrtPublishPassenger,
  queryPublish,
  queryPublishById,
  updatePublish,
  noSeatNum,
  latestDriverPublish,
  latestPublishByUser
}

// 车主发布订单
function insertPublish (publish) {
  return axios.post('/publish/inesrtPublish', publish)
}

// 乘客发布订单
function inesrtPublishPassenger (data) {
  return axios.post('/publish/inesrtPublishPassenger', data)
}

// 查询我所有的发布
function queryPublish () {
  return axios.post('/publish/queryPublish')
}

// 通过id查询发布详情
function queryPublishById (id) {
  return axios({
    url: '/publish/queryPublish',
    method: 'POST',
    params: { id }
  })
}

// 车主修改发布的信息（修改行程）
function updatePublish (data) {
  return axios.post('/publish/updatePublish', data)
}

// 设为无座
function noSeatNum (id) {
  return axios({
    url: '/publish/noSeatNum',
    method: 'POST',
    params: { id }
  })
}

// 车主最近一次发布的订单信息
function latestDriverPublish () {
  return axios.post('/publish/latestDriverPublish')
}

// 查询乘客最近一次发布的信息
function latestPublishByUser () {
  return axios.post('/order/latestPublishByUser')
}
