import axios from './http'

export default {
  postApplication,
  getApplications,
  getStationCode,
  getFreePublishTime,
  getManager,
  updateManagerPublish,
  getCountByStation
}

// 申请站长
function postApplication (data) {
  return axios.post('/station/postApplication', data)
}

// 查询申请记录
function getApplications (params) {
  return axios({
    url: '/station/getApplications',
    method: 'GET',
    params
  })
}

// 查询站长副站长对应区域code
function getStationCode () {
  return axios.get('/station/getCode')
}

// 查询站长剩余发布数量
function getFreePublishTime () {
  return axios.get('/station/getFreeTime')
}

// 查询对应区域的副站长或群主
function getManager (params) {
  return axios({
    url: '/station/getManager',
    method: 'GET',
    params
  })
}

// 修改副站长发布功能
function updateManagerPublish (params) {
  return axios({
    url: '/station/updateIsPublish',
    method: 'PUT',
    params
  })
}

// 查询站长区域拼车发布数量
function getCountByStation () {
  return axios.put('/station/countByUserId')
}
