export default {
  state: {
    startAddr: { name: '' },
    endAddr: { name: '' }
  },

  mutations: {
    setSearchAddr (state, { type, value }) {
      state[type] = value
    }
  }
}
