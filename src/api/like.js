import axios from './http'

export default { commitLike }

function commitLike (isLike, pprId) {
  return axios({
    url: '/isLike/getCommonRoute',
    method: 'POST',
    params: { isLike, pprId }
  })
}
