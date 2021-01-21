import { Toast } from 'vant'

// 支付宝支付
export function aliPay (res) {
  const form = res.data.data.data
  const div = document.createElement('div')
  div.innerHTML = form
  document.body.appendChild(div)
  document.forms[0].submit()
}

// 微信支付
export function wexinPay (res) {
  Toast.loading({ message: '微信支付' })
  const url = res.data.data.data.mwebUrl
  window.location.href = url
}
