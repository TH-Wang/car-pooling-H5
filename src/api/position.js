import axios from './http'

export default {
  queryPositionForCity,
  queryPositionForCounty
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
