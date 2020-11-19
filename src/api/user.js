import axios from './http'

export default { sendCode, userCodeLogin }

// 获取短信验证码
function sendCode ({ phone, type }) {
  return axios({
    url: '/smscode/sendCode',
    method: 'POST',
    params: { phone, type }
  })
}

// 用户验证码登录
function userCodeLogin ({ phone, code }) {
  return axios({
    url: '/user/userSmsCodeLogin',
    method: 'POST',
    params: { userPhone: phone, code }
  })
}
