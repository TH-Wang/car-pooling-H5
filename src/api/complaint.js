import axios from './http'

export default { addComplaint, userComplaintDetail }

// 用户投诉
function addComplaint (data) {
  return axios.post('/complaint/add', data)
}

// 查询用户投诉历史记录
function userComplaintDetail () {
  return axios.post('/complaint/userComplaintDetail')
}
