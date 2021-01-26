import axios from './http'

export default {
  selectGroup,
  selectGroupById,
  addGroup,
  queryGroupByUser,
  queryMineGroup,
  queryMineGroupEarnings,
  payIntoGroup
}

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

// 查询用户的群
function queryGroupByUser () {
  return axios.post('/group/groupByUser')
}

// 查询用户个人上传的群
function queryMineGroup (id) {
  return axios.post('/web/group/groupByUser?adminId=' + id)
}

// 查询用户个人上传的群
function queryMineGroupEarnings (id) {
  return axios.post('/web/group/groupEarnings?adminId=' + id)
}

// 用户付费进群
function payIntoGroup (params) {
  return axios({
    url: '/group/intoGroup',
    method: 'POST',
    params
  })
}
