import axios from './http'

export default { selectAccountInfo }

function selectAccountInfo () {
  return axios.post('/account/selectAccountInfo')
}
