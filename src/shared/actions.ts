import { initGlobalState, MicroAppStateActions } from 'qiankun'

const initialState = {
  token: '123456'
}
const actions: MicroAppStateActions = initGlobalState(initialState)

export default actions
