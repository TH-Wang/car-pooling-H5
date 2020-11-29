import axios from './http'

export default {
  queryPositionForCity,
  queryPositionForCounty,
  savePosition,
  queryPositionByCityName
}

// 查询所有城市列表
function queryPositionForCity () {
  return axios.post('/position/queryPositionForCity')
}

// 根据城市code查询区县列表
function queryPositionForCounty (code) {
  return axios({
    url: '/position/queryPositionForCounty',
    method: 'POST',
    params: { code }
  })
}

// 保存用户地区信息
function savePosition (id) {
  return axios({
    url: '/position/savePosition',
    method: 'POST',
    params: { id }
  })
}

// 模糊查询城市
function queryPositionByCityName (name) {
  return axios({
    url: '/position/queryPositionByCityName',
    method: 'POST',
    params: { name }
  })
}
