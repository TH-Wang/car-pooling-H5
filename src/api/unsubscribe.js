import axios from './http'

export default { selectUnsubscribeReason }

function selectUnsubscribeReason () {
  return axios.post('/unsubscribeReson/getCommonRoute')
}
