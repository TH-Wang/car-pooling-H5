import { cloneDeep } from 'lodash'

export default {
  state: {
    startAddr: { name: '' },
    endAddr: { name: '' }
  },

  mutations: {
    setSearchAddr (state, { type, value }) {
      state[type] = value
    },
    // 切换起止点位置
    switchSearchAddr (state) {
      const tmp = cloneDeep(state.startAddr)
      state.startAddr = cloneDeep(state.endAddr)
      state.endAddr = cloneDeep(tmp)
    }
  }
}
