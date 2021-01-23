export default {
  state: {
    pay: '',
    code: ''
  },

  mutations: {
    setPayUrl (state, url) {
      state.pay = url
    },
    setCodeUrl (state, url) {
      state.code = url
    }
  }
}
