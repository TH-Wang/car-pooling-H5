// 存储用户操作的历史记录，并与localStorage保持同步
const storageType = {
  position: 'searchPos',
  passPoint: 'passList'
}

const localPosition = JSON.parse(localStorage.getItem(storageType.position))
const localPassPoint = JSON.parse(localStorage.getItem(storageType.passPoint))

// 存储容量
const limit = 15

export default {
  state: {
    position: localPosition || [],
    passPoint: localPassPoint || []
  },

  mutations: {
    // 新增地点搜索历史（容量15）
    addPositionHistory (state, data) {
      // 如果已存在就返回
      if (state.position.find(i => i.id === data.id)) return
      // let list = []
      // 判断历史记录容量
      if (state.position.length >= limit) {
        // 如果已达到上限，则先出队列，再进队列
        // list = [data, ...state.position.slice(0, 14)]
        state.position.pop()
      } else {
        // 如果正常
        // list = [data, ...state.position]
      }
      state.position.unshift(data)
      localStorage.setItem(storageType.position, JSON.stringify(state.position))
    },
    // 清空搜索历史
    clearPositionHistory (state) {
      state.position = []
      localStorage.removeItem(storageType.position)
    },
    // 新增途径点搜索历史（容量15）
    addPassPointHistory (state, data) {
      // 如果已存在就返回
      if (state.passPoint.find(i => i.id === data.id)) return

      // 判断历史记录容量
      if (state.passPoint.length >= limit) {
        // 如果已达到上限，则先出队列，再进队列
        state.passPoint.pop()
      }
      state.passPoint.unshift(data)
      localStorage.setItem(storageType.passPoint, JSON.stringify(state.passPoint))
    }
  }
}
