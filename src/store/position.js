import { isEqual } from 'lodash'

const prov = JSON.parse(localStorage.getItem('prov'))
const city = JSON.parse(localStorage.getItem('city'))
const county = JSON.parse(localStorage.getItem('county'))

const defaultData = { name: '', shortName: '' }

export default {
  state: {
    // 当前正在选择城市，还是正在选择区县
    current: 'prov',
    defaultData: defaultData,
    // 已选择的省市区信息
    selected: {
      // 省
      prov: prov || defaultData,
      // 市
      city: city || defaultData,
      // 区县
      county: county || defaultData
    },
    // 列表
    list: {
      // 省的字母索引列表
      word: [],
      // 省列表
      prov: [],
      // 市列表
      city: [],
      // 区县列表
      county: []
    },
    // 当前定位的详细信息
    detail: {}
  },

  mutations: {
    // 设置当前选择的类别
    setCurPosition (state, type) {
      state.current = type
    },
    // 设置数据列表
    setPositionList (state, { type, list }) {
      state.list[type] = list
    },
    // 设置当前选择项
    setPositionSelect (state, { type, value }) {
      state.selected[type] = value
      localStorage.setItem(type, JSON.stringify(value))
    },
    // 重置选择项
    resetPositionSelect (state, type) {
      state.selected[type] = defaultData
      localStorage.setItem(type, JSON.stringify(defaultData))
    }
  },

  actions: {
    resetCounty ({ commit }) {
      commit('setCounty', defaultData)
    }
  },

  getters: {
    // 当前定位字符串
    location (state, context) {
      // if (context.unGeoLocation) return '请选择城市'
      const { city, county } = state.selected
      const text = []
      if (!isEqual(city, defaultData)) text.push(city.shortName)
      if (!isEqual(county, defaultData)) text.push(county.shortName)
      return text.join('·')
    },
    // 当前定位市的名称
    cityName (state) {
      return state.selected.city.name
    },
    // 当前定位区县名称
    countyName (state) {
      return state.selected.county.name
    },
    // 判断是否已定位或选择城市
    unGeoLocation (state) {
      const { city, county } = state.selected
      return isEqual(city, defaultData) || isEqual(county, defaultData)
    }
  }
}
