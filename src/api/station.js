import axios from './http'

export default { postApplication }

// 申请站长
function postApplication (data) {
  return axios.post('/station/postApplication', data)
}
