export default {
  state: {
    myTrip: 0
  },

  mutations: {
    changeTabsId (state, { type, index }) {
      state[type] = index
    }
  }
}
