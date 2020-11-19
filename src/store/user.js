const storageToken = localStorage.getItem('token')

export default {
  state: {
    token: storageToken || ''
  },

  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  }
}
