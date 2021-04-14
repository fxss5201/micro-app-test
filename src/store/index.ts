import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: 'store123456'
  },
  mutations: {
    setToken (state, val) {
      state.token = val
    }
  },
  actions: {
  },
  modules: {
  }
})
