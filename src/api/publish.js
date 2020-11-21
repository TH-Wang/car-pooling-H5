import axios from './http'

export default { insertPublish }

// 发布订单
function insertPublish (publish) {
  return axios.post('/publish/inesrtPublish', publish)
}
