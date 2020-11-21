import axios from './http'

export default { getCar, getCommonRoute }

// 按条件找车
function getCar (carVo) {
  return axios.post('/order/getCar', carVo)
}

// 获取常用路线
function getCommonRoute (params) {
  return axios({
    url: '/order/getCommonRoute',
    method: 'POST',
    params
  })
}
