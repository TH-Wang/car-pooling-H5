import axios from './http'

export default { selectGroup, selectGroupById }

// 查询拼车群列表
function selectGroup (params) {
  return axios({
    url: '/group/select',
    method: 'POST',
    params
  })
}

// 根据id查询拼车群详情
function selectGroupById (id) {
  return axios({
    url: '/group/detail',
    method: 'POST',
    params: { id }
  })
}
