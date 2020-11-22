import Vue from 'vue'
import Vuex from 'vuex'
import tabbar from './tabbar'
import tabsId from './tabsId'
import user from './user'
import account from './account'
import position from './position'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tabbar,
    tabsId,
    user,
    account,
    position
  }
})
