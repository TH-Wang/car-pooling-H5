import axios from './http'

export default { selectGroup, selectGroupById, addGroup }

// 查询拼车群列表
function selectGroup (data) {
  const params = Object.assign({
    isSpecial: false,
    newDate: false
  }, data)
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

// 入驻群
function addGroup (data) {
  return axios.post('/group/add', data)
}
