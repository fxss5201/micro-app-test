import Vue from 'vue'
import store from './../store'

// 使用 Event Bus
const bus = new Vue({
  data: {
    // 保持初始化时与store数据一致
    // 基本类型可以这样用，引用类型请用cloneDeep深拷贝
    // https://www.lodashjs.com/docs/lodash.cloneDeep#_clonedeepvalue
    token: store.state.tokenModule.token
  }
})

export default bus
