export default {
  state: {
    startAddr: null,
    endAddr: null
  },

  mutations: {
    setSearchAddr (state, { type, value }) {
      state[type] = value
    }
  }
}
