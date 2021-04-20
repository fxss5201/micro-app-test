import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import startQiankun from './micro'
import bus from './plugins/bus'

startQiankun({ prefetch: false })
Vue.config.productionTip = false
Vue.prototype.$bus = bus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#main-app')
