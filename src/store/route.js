export default {
  state: {
    history: null
  },

  mutations: {
    setHistoryRoute (state, path) {
      state.history = path
    },
    clearHistoryRoute (state) {
      state.history = null
    }
  }
}
