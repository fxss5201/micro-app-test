export default {
  namespaced: true,
  state: {
    token: 'store123456'
  },
  mutations: {
    setToken (state: any, val: string) {
      console.log(val)
      state.token = val
    }
  },
  actions: {
  },
  modules: {
  }
}
