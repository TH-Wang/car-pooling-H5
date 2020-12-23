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
    },
    setReleaseAddrInfo (state, list) {
      // 分发到对应的位置信息
      const passPointList = []
      list.forEach(item => {
        // 转换key
        const addr = cloneDeep(item)
        addr.name = item.pointName
        addr.location = { lng: item.lon, lat: item.lat }
        delete addr.pointName
        delete addr.lon
        delete addr.lat
        switch (item.type) {
          case 1: state.startAddr = addr; break
          case 2: passPointList.push(addr); break
          case 3: state.endAddr = addr; break
        }
      })
      // 设置途径点信息
      state.passPointList = passPointList
    }
  }
}
