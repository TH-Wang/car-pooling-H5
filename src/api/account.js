import axios from './http'

export default { selectAccountInfo, selectAccountRecord }

function selectAccountInfo () {
  return axios.post('/account/selectAccountInfo')
}

// 查询账户信息
function selectAccountRecord (params) {
  return axios({
    url: '/account/selectAccountRecord',
    method: 'POST',
    params
  })
}
