// 存储用户操作的历史记录，并与localStorage保持同步
const storageType = {
  position: 'searchPos'
}

const localPosition = JSON.parse(localStorage.getItem(storageType.position))

export default {
  state: {
    position: localPosition || []
  },

  mutations: {
    addPositionHistory (state, data) {
      // 如果已存在就返回
      if (state.position.find(i => i.id === data.id)) return
      let list = []
      // 判断历史记录容量
      if (state.position.length >= 15) {
        // 如果已达到上限，则先出队列，再进队列
        list = [data, ...state.position.slice(0, 14)]
        state.position.shift()
      } else {
        // 如果正常
        list = [data, ...state.position]
      }
      state.position.unshift(data)
      localStorage.setItem(storageType.position, JSON.stringify(list))
    },
    clearPositionHistory (state) {
      state.position = []
      localStorage.removeItem(storageType.position)
    }
  }
}
