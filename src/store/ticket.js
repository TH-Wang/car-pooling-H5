// const userUnionCode = localStorage.getItem('union')

export default {
  state: {
    token: null,
    ticket: null,
    code: null
  },

  mutations: {
    setWxAccessToken (state, data) {
      state.token = data
    },
    setWxTicket (state, data) {
      state.ticket = data
    },
    setUnionCode (state, data) {
      state.code = data
      // localStorage.setItem('union', data)
    }
  }
}
