const storageToken = localStorage.getItem('token')
const phone = localStorage.getItem('phone')
const info = JSON.parse(localStorage.getItem('info'))

export default {
  state: {
    token: storageToken || '',
    loginPhone: phone || '',
    info: info || {}
  },

  mutations: {
    setStorage (state, { token, phone, info }) {
      state.token = token
      state.loginPhone = phone
      state.info = info
      localStorage.setItem('token', token)
      localStorage.setItem('phone', phone)
      localStorage.setItem('info', JSON.stringify(info))
    },
    setUserInfo (state, { key, value }) {
      state[key] = value
      // 更新localStorage
      const update = info
      update[key] = value
      localStorage.setItem('info', JSON.stringify(update))
    }
  },

  getters: {
    // 获取用户身份：0乘客，1车主
    identity (state) {
      return state.info.carstatus === 'YES' ? 0 : 1
    }
  }
}
