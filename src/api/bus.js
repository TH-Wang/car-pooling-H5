import axios from './http'

export default {
  getBusTypeList,
  getBusList,
  getBusDetailById
}

// 获取旅游分类列表
function getBusTypeList () {
  return axios.post('/charterCar/typeList')
}

// 获取旅游列表
function getBusList (params) {
  return axios({
    url: '/charterCar/queryWithType',
    method: 'POST',
    params
  })
}

// 获取旅游详情
function getBusDetailById (id) {
  return axios({
    url: '/charterCar/queryById',
    method: 'POST',
    params: { id }
  })
}
