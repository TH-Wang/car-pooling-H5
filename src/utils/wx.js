/**
 * 获取asaccess_tokens
 * GET https://api.weixin.qq.com/cgi-bin/token?
 *  grant_type=client_credential&
 *  appid=APPID&
 *  secret=APPSECRET
 */
/**
 * 获取jsapi_ticket
 * GET https://api.weixin.qq.com/cgi-bin/ticket/getticket?
 *  access_token=ACCESS_TOKEN&
 *  type=jsapi
 */
import axios from 'axios'
import randomString from 'randomString'
import store from '@/store'
import sha1 from 'js-sha1'
import md5 from 'blueimp-md5'
import { getPrepayId } from '@/api'

const appid = ''
const secret = ''
const url = 'http://pinchezhijia.com'

// window.addEventListener('load', wxConfig, false)

// 获取jsapi权限
export default async function () {
  if (!isWeixin) return Promise.reject(new Error('不是微信浏览器'))
  try {
    // 1. 获取asaccess_tokens
    const token = await getAccessToken()
    // 2. 获取jsapi_ticket
    const ticket = await getJsApiTicket(token)
    // 3. 生成签名
    const signature = await createSignature(ticket)
    // 4. 配置
    await config(signature)
    return Promise.resolve()
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

// 判断是否是微信浏览器
export function isWeixin () {
  const ua = navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) === 'micromessenger'
}

// 微信支付
export async function chooseWXPay () {
  const res = await getPrepayId()
  const pk = 'prepay_id=' + res.data.data
  const config = {
    appId: appid,
    nonceStr: randomString(16),
    package: pk,
    signType: 'MD5',
    timeStamp: new Date().getTime()
  }
  const paySign = getSign(config, 'md5').toUpperCase()
  Object.assign(config, paySign)
  console.log('=====支付配置=====')
  console.log(config)
  window.wx.chooseWXPay(config)
}

// 1. 获取asaccess_tokens
async function getAccessToken () {
  if (!store.state.ticket) {
    const res = await axios({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      method: 'GET',
      params: {
        grant_type: 'client_credential',
        appid,
        secret
      }
    })
    console.log(res)
    if (res.data.asaccess_tokens) {
      const token = res.data.asaccess_tokens
      store.commit('setWxTicket', token)
      return token
    }
    if (res.data.errcode) throw new Error(res.data)
  }
  return store.state.ticket
}

// 2. 获取jsapi_ticket
async function getJsApiTicket (token) {
  const res = await axios({
    url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
    method: 'GET',
    params: { access_token: token, type: 'jsapi' }
  })
  console.log(res)
  if (res.data.errcode === 0) return res.data.ticket
  else throw new Error(res.data)
}

// 3. 生成签名signature
async function createSignature (ticket) {
  const data = {
    jsapi_ticket: ticket,
    noncestr: randomString(16),
    timestamp: new Date().getTime(),
    url: url
  }
  console.log(data)
  return getSign(data, 'sha1')
}

// 4. 配置
async function config (signature) {
  window.wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appid, // 必填，公众号的唯一标识
    timestamp: new Date().getTime(), // 必填，生成签名的时间戳
    nonceStr: randomString(16), // 必填，生成签名的随机串
    signature: signature, // 必填，签名
    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
  })
  window.wx.ready(function () {
    return Promise.resolve()
  })
  window.wx.error(function (res) {
    console.log(res)
    return Promise.reject(res)
  })
}

// 加密
function getSign (obj, type) {
  const arr = []
  for (const key in obj) {
    arr.push(`${key}=${obj[key]}`)
  }
  const string1 = arr.join('&')
  return type === 'sha1' ? sha1(string1) : md5(string1)
}
