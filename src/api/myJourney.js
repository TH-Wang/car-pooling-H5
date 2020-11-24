import axios from './http'

export default { queryAllJourney }

// 查询我的行程
function queryAllJourney (params) {
  return axios({
    url: '/myJourney/queryAll',
    method: 'POST',
    params
  })
}
