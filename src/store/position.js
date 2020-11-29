const city = JSON.parse(localStorage.getItem('city'))
const county = JSON.parse(localStorage.getItem('county'))

export default {
  state: {
    // 当前正在选择城市，还是正在选择区县
    current: 'city',
    // 选择的城市
    city,
    // 选择的区县
    county,
    // 所有城市列表
    cityList: [],
    // 当前选择城市中所有区县的列表
    countyList: [],
    // 城市首字母列表
    wordsList: []
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
    }
  },

  getters: {
    location (state) {
      return state.county
        ? state.city.shortName + ' · ' + state.county.name
        : state.city.shortName
    }
  }
}
