// 存储用户操作的历史记录，并与localStorage保持同步
const storageType = {
  position: 'searchPos',
  passPoint: 'passList',
  driverPublish: 'driPub',
  customerPublish: 'cusPub'
}

const localPosition = JSON.parse(localStorage.getItem(storageType.position))
const localPassPoint = JSON.parse(localStorage.getItem(storageType.passPoint))
const localDriPub = JSON.parse(localStorage.getItem(storageType.driverPublish))
const localCusPub = JSON.parse(localStorage.getItem(storageType.customerPublish))

// 存储容量
const limit = 15

export default {
  state: {
    position: localPosition || [],
    passPoint: localPassPoint || [],
    driverPublish: localDriPub || {},
    customerPublish: localCusPub || {}
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
    },
    // 存储车主发布的信息
    setDriverPublish (state, data) {
      state.driverPublish = data
      localStorage.setItem(storageType.driverPublish, JSON.stringify(data))
    },
    // 存储乘客发布的信息
    setCustomerPublish (state, data) {
      state.customerPublish = data
      localStorage.setItem(storageType.customerPublish, JSON.stringify(data))
    }
  }
}
