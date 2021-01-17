// 客服信息
import axios from './http'

export default {
  getServiceInfo
}

function getServiceInfo () {
  return axios.get('/carService/query')
}
