import store from '@/store'
import router from '@/router'
import { Dialog } from 'vant'

export default function (msg) {
  return new Promise((resolve, reject) => {
    if (!store.state.user.token) {
      Dialog.confirm({
        message: msg,
        confirmButtonText: '立即登录',
        cancelButtonText: '稍后再登',
        showCancelButton: true
      })
        .then(() => {
          router.push('/common/login')
          resolve(false)
        })
    } else resolve(true)
  })
}
