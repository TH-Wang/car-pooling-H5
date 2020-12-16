// 发布页面的缓存数据
import { cloneDeep } from 'lodash'

export default {
  state: {
    startAddr: { name: '' },
    endAddr: { name: '' },
    passPointList: []
  },

  mutations: {
    setReleaseAddr (state, { type, value }) {
      state[type] = value
    },
    // 切换起止点位置
    switchReleaseAddr (state) {
      const tmp = cloneDeep(state.startAddr)
      state.startAddr = cloneDeep(state.endAddr)
      state.endAddr = cloneDeep(tmp)
    },
    updateReleasePassPoint (state, { type, record, index }) {
      if (type === 'add') {
        state.passPointList.push(record)
      } else if (type === 'remove') {
        state.passPointList.splice(index, 1)
      }
    }
  }
}
