import { LOGIN_TO } from './mutation-type'
export default {
  [LOGIN_TO](state, payload) {
    state.loginTo = payload.obj
  }
}
