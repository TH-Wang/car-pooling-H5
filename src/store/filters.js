import { queryPositionForCounty } from '@/api'
import moment from 'moment'

export default {
  state: {
    currentCityCode: {},
    areaOptions: [],
    currentDate: null,
    timeOptions: []
  },

  mutations: {
    // 设置当前区域
    setFilterCurCity (state, code) {
      state.currentCityCode = code
    },
    // 设置区县选择项
    setAreaOptions (state, list) {
      state.areaOptions = [
        { text: '全城', value: 0 },
        ...list.map(item => ({
          value: item.code,
          text: item.name
        }))
      ]
    },
    // 设置日期选择项
    updateDateOptions (state) {
      const formatText = 'DD日'
      const formatValue = 'YYYY-MM-DD 00:00:00'
      const today = moment()
      const day2 = moment().add(1, 'days')
      const day3 = moment().add(2, 'days')
      const list = [
        { text: '全部', value: 0 },
        { text: `今天(${today.format(formatText)})`, value: 1, date: today.format(formatValue) },
        { text: `明天(${day2.format(formatText)})`, value: 2, date: day2.format(formatValue) },
        { text: `后天(${day3.format(formatText)})`, value: 3, date: day3.format(formatValue) }
      ]
      state.timeOptions = list
      state.currentDate = today
    }
  },

  actions: {
    // 更新区县列表
    async updateAreaOptions ({ commit }, code) {
      const res = await queryPositionForCounty(code)
      if (res.data.status === 200) {
        commit('setAreaOptions', res.data.data)
        commit('setFilterCurCity', code)
      }
    }
  }
}
