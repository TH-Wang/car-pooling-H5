import axios from './http'

export default { selectUnsubscribeReason }

function selectUnsubscribeReason (type) {
  return axios({
    url: '/unsubscribeReson/getCommonRoute',
    method: 'POST',
    params: { type }
  })
}
