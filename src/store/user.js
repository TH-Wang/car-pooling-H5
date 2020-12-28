const storageToken = localStorage.getItem('token')
const phone = localStorage.getItem('phone')
const info = JSON.parse(localStorage.getItem('info'))

export default {
  state: {
    token: storageToken || '',
    loginPhone: phone || '',
    info: info || {},
    carList: []
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
    setUserInfo (state, data) {
      const newInfo = Object.assign(state.info, data)
      state.info = newInfo
      localStorage.setItem('info', JSON.stringify(newInfo))
    },
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    clearToken (state) {
      state.token = null
      localStorage.removeItem('token')
    },
    setCarInfo (state, list) {
      state.carList = list
    }
  },

  getters: {
    // 获取用户身份：0乘客，1车主
    identity (state) {
      return state.info.carstatus === 'YES' && state.info.driverlicensestatus === 'YES' ? 1 : 0
    }
  }
}
