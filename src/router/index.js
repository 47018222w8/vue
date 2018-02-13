import Vue from 'vue'
import Router from 'vue-router'
const home = r => require.ensure([], () => r(require('@/page/home')), 'home')
const login = r => require.ensure([], () => r(require('@/page/login')), 'login')
const inter = r => require.ensure([], () => r(require('@/page/inter')), 'inter')
const interAdd = r => require.ensure([], () => r(require('@/page/inter-add')), 'interAdd')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: 'inter',
          name: 'inter',
          component: inter
        },
        {
          path: 'interAdd',
          name: 'interAdd',
          component: interAdd
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
