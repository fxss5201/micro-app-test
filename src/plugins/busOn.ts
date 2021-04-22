/* eslint-disable */
export default {
  install (thisArg: any) {
    thisArg.$bus.$on('setBusToken', (val: string) => {
      thisArg.$bus.token = val
      thisArg.$store.commit('tokenModule/setToken', val)
    })
  }
}
