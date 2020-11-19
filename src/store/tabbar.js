// 全局tabbar控制

export default {
  state: () => ({
    tabbarId: 0
  }),

  mutations: {
    changeTabbar (state, index) {
      state.tabbarId = index
    }
  }
}
