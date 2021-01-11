import axios from './http'

export default {
  postApplication,
  getApplications,
  getManager,
  updateManagerPublish
}

// 申请站长
function postApplication (data) {
  return axios.post('/station/postApplication', data)
}

// 查询申请记录
function getApplications (params) {
  return axios({
    url: '/station/getApplications',
    method: 'POST',
    params
  })
}

// 查询对应区域的副站长或群主
function getManager (params) {
  return axios.get('/station/getManager', params)
}

// 修改副站长发布功能
function updateManagerPublish (params) {
  return axios({
    url: '/station/updateIsPublish',
    method: 'PUT',
    params
  })
}
