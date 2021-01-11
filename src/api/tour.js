import axios from './http'

export default {
  getTourTypeList,
  getTourList,
  getTourDetailById
}

// 获取旅游分类列表
function getTourTypeList () {
  return axios.post('/tour/typeList')
}

// 获取旅游列表
function getTourList (params) {
  return axios({
    url: '/tour/queryWithType',
    method: 'POST',
    params
  })
}

// 获取旅游详情
function getTourDetailById (id) {
  return axios({
    url: '/tour/queryById',
    method: 'POST',
    params: { id }
  })
}
