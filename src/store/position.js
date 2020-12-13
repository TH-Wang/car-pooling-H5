import { isEqual } from 'lodash'

const city = JSON.parse(localStorage.getItem('city'))
const county = JSON.parse(localStorage.getItem('county'))

const defaultData = { name: '', shortName: '' }

export default {
  state: {
    // 当前正在选择城市，还是正在选择区县
    current: 'city',
    // 选择的城市
    city: city || defaultData,
    // 选择的区县
    county: county || defaultData,
    // 所有城市列表
    cityList: [],
    // 当前选择城市中所有区县的列表
    countyList: [],
    // 城市首字母列表
    wordsList: [],
    // 当前定位的详细信息
    detail: {}
  },

  mutations: {
    setCurPosition (state, type) {
      state.current = type
    },
    setCity (state, city) {
      state.city = city
      localStorage.setItem('city', JSON.stringify(city))
    },
    setCounty (state, county) {
      state.county = county
      localStorage.setItem('county', JSON.stringify(county))
    },
    setCityList (state, list) {
      state.cityList = list
    },
    setCountyList (state, list) {
      state.countyList = list
    },
    setWordsList (state, list) {
      state.wordsList = list
    },
    setPositionDetail (state, data) {
      state.detail = data
    }
  },

  actions: {
    resetCounty ({ commit }) {
      commit('setCounty', defaultData)
    }
  },

  getters: {
    location (state, context) {
      if (context.unGeoLocation) return '请选择城市'
      return isEqual(state.county, defaultData)
        ? state.city.shortName
        : state.city.shortName + ' · ' + state.county.name
    },
    // 判断是否已定位或选择城市
    unGeoLocation (state) {
      return isEqual(state.city, defaultData) || isEqual(state.county, defaultData)
    }
  }
}
