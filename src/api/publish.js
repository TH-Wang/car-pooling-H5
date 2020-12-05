import axios from './http'

export default { insertPublish, queryPublish, queryPublishById }

// 发布订单
function insertPublish (publish) {
  return axios.post('/publish/inesrtPublish', publish)
}

// 查询我所有的发布
function queryPublish () {
  return axios.post('/publish/queryPublish')
}

// 通过id查询发布详情
function queryPublishById (id) {
  return axios({
    url: '/publish/queryPublish',
    method: 'POST',
    params: { id }
  })
}
