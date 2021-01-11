import axios from './http'

export default {
  getLatestSearch
}

function getLatestSearch () {
  return axios.post('/search/getLatestSearch')
}
