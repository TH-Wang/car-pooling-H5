import axios from './http'

export default { queryUserMessage }

function queryUserMessage (params) {
  return axios({
    url: '/message/queryUserMessage',
    method: 'POST',
    params
  })
}
