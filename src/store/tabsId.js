export default {
  state: {
    myTrip: 0,
    myOrder: 0
  },

  mutations: {
    changeTabsId (state, { type, index }) {
      state[type] = index
    }
  }
}