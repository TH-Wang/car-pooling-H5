export default {
  state: {
    // 当前正在选择城市，还是正在选择区县
    current: 'city',
    // 选择的城市
    city: null,
    // 选择的区县
    county: null,
    // 所有城市列表
    cityList: [],
    // 当前选择城市中所有区县的列表
    countyList: []
  },

  mutations: {
    setCurPosition (state, type) {
      state.current = type
    },
    setCity (state, city) {
      state.city = city
    },
    setCounty (state, county) {
      state.county = county
    },
    setCityList (state, list) {
      state.cityList = list
    },
    setCountyList (state, list) {
      state.countyList = list
    }
  }
}
