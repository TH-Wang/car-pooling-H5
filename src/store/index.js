import Vue from 'vue'
import Vuex from 'vuex'
import tabbar from './tabbar'
import tabsId from './tabsId'
import user from './user'
import account from './account'
import position from './position'
import search from './search'
import release from './release'
import history from './history'

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
    position,
    search,
    release,
    history
  }
})
