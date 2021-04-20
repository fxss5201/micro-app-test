import bus from './bus'

export default {
  install (thisArg: any) {
    bus.$on('setBusToken', (val: string) => {
      thisArg.$store.commit('tokenModule/setToken', val)
    })
  }
}
