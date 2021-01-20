import { userIdentity, userDriving } from '@/api'

const storageToken = localStorage.getItem('token')
const phone = localStorage.getItem('phone')
const info = JSON.parse(localStorage.getItem('info'))

export default {
  state: {
    token: storageToken || '',
    loginPhone: phone || '',
    info: info || {},
    carList: [],
    identityInfo: {},
    drivingInfo: {}
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
    },
    setAuthInfo (state, obj) {
      for (const key in obj) {
        state[key] = obj[key]
      }
    }
  },

  actions: {
    // 查询身份证验证、驾驶证验证的信息
    async queryAuthInfo ({ commit }) {
      const identityRes = await userIdentity()
      const drivingRes = await userDriving()
      commit('setAuthInfo', {
        identityInfo: identityRes.data.data,
        drivingInfo: drivingRes.data.data
      })
    }
  },

  getters: {
    // 获取用户身份：0乘客，1车主
    identity (state) {
      return state.info.carstatus === 'YES' && state.info.driverlicensestatus === 'YES' ? 1 : 0
    },
    // 获取用户身份：0乘客，1车主
    identitys (state) {
      const identity = state.identityInfo
        ? state.identityInfo.state === 2
        : false
      const driving = state.drivingInfo
        ? state.drivingInfo.state === 2
        : false
      const car = state.carList.some(i => i.state && i.state === 2)
      return (identity && driving && car) ? 1 : 0
    }
  }
}
