// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/state'
// import { LOGIN_TO } from './store/mutation-type'
import router from './router'
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { BASE_URL, JWT_HEADER } from './components/constant'
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL = BASE_URL
axios.defaults.headers.common[JWT_HEADER] = localStorage.getItem(JWT_HEADER)
axios.defaults.timeout = 30000
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response) {
    let result = error.response
    if (result.status === 500 || result.status === 504) {
      router.push({
        name: 'error'
      })
      throw error
    } else if (result.status === 403) {
      router.push({
        name: 'forbidden'
      })
      throw error
    } else if (result.status === 401 && result.data.code === 'AUTHORIZATION_EXPIRED') {
      localStorage.removeItem(JWT_HEADER)
      // store.commit(LOGIN_TO, { obj: { name: router.app._route.name, params: router.app._route.params } })
      Message.warning({
        message: '登录超时,即将返回登录页',
        center: true,
        duration: 1500
      })
      setTimeout(() => {
        router.push({
          name: 'login'
        })
      }, 1500)
      throw error
    } else {
      return Promise.reject(error)
    }
  } else {
    router.push({
      name: 'error'
    })
    throw error
  }
})
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
