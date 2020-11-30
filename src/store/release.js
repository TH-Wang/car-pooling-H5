// 发布页面的缓存数据

export default {
  state: {
    startAddr: { name: '' },
    endAddr: { name: '' }
  },

  mutations: {
    setReleaseAddr (state, { type, value }) {
      state[type] = value
    }
  }
}
