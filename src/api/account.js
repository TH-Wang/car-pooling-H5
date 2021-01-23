import axios from './http'

export default {
  selectAccountInfo,
  selectAccountRecord,
  insertAccount
}

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

// 充值
function insertAccount (params) {
  return axios({
    url: '/account/insertAccount',
    method: 'POST',
    params
  })
}
