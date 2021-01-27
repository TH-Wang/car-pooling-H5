// import router from '@/router'
import store from '@/store'
import { Toast, Dialog } from 'vant'
import { isWeixin } from '@/utils/wx'

// 支付宝支付
export function aliPay (res) {
  const form = res.data.data.data
  const div = document.createElement('div')
  div.innerHTML = form
  document.body.appendChild(div)
  document.forms[0].submit()
}

// 微信支付
export async function wexinPay (res, redirect) {
  if (isWeixin()) {
    const data = res.data.data.data
    // eslint-disable-next-line no-undef
    WeixinJSBridge.invoke(
      // 'getBrandWCPayRequest', {
      //   appId: 'wx2421b1c4370ec43b', // 公众号名称，由商户传入
      //   timeStamp: '1395712654', // 时间戳，自1970年以来的秒数
      //   nonceStr: 'e61463f8efa94090b1f366cccfbbb444', // 随机串
      //   package: 'prepay_id=u802345jgfjsdfgsdg888',
      //   signType: 'MD5', // 微信签名方式：
      //   paySign: '70EA570631E4BB79628FBCA90534C63FF7FADD89' // 微信签名
      // },
      'getBrandWCPayRequest',
      data,
      function (res) {
        // eslint-disable-next-line eqeqeq
        if (res.err_msg == 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          Toast.success({ message: '支付成功' })
          store.commit('setUnionCode', null)
          return Promise.resolve()
          // if (redirect) router.push(redirect)
        } else {
          store.commit('setUnionCode', null)
          Dialog.alert({ title: '遇到问题', message: '支付失败或取消支付，请稍后重试' })
          return Promise.reject(new Error('支付失败'))
        }
      })
  } else {
    Toast.loading({ message: '微信支付' })
    const url = res.data.data.data
    console.log(url)
    // const url = 'https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx220940338621635658501c71c77c250000&package=25389944'
    window.location.href = url
  }
}
