import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex)
const state = {
  // 登录后跳转路由对象
  loginTo: {name: 'home'}
}
export default new Vuex.Store({
  state,
  mutations
})
