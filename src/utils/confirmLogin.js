import store from '@/store'
import router from '@/router'
import { Dialog } from 'vant'

export default function (msg) {
  if (!store.state.user.token) {
    Dialog.confirm({
      message: msg,
      confirmButtonText: '立即登录',
      cancelButtonText: '稍后再登',
      showCancelButton: true
    })
      .then(() => {
        router.push('/common/login')
      })
      .catch(() => {
        router.go(-1)
      })
  }
}
