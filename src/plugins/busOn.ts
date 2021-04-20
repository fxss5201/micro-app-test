/* eslint-disable */
export default {
  install (thisArg: any) {
    thisArg.$bus.$on('setBusToken', (val: string) => {
      thisArg.$store.commit('tokenModule/setToken', val)
    })
  }
}
