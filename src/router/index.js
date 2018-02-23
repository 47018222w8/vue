import Vue from 'vue'
import Router from 'vue-router'
const home = r => require.ensure([], () => r(require('@/page/home')), 'home')
const login = r => require.ensure([], () => r(require('@/page/login')), 'login')
const role = r => require.ensure([], () => r(require('@/page/role')), 'role')
const roleAdd = r => require.ensure([], () => r(require('@/page/role-add')), 'roleAdd')
const menu = r => require.ensure([], () => r(require('@/page/menu')), 'menu')
const menuAdd = r => require.ensure([], () => r(require('@/page/menu-add')), 'menuAdd')
const account = r => require.ensure([], () => r(require('@/page/account')), 'account')
const accountAdd = r => require.ensure([], () => r(require('@/page/account-add')), 'accountAdd')
const inter = r => require.ensure([], () => r(require('@/page/inter')), 'inter')
const interEdit = r => require.ensure([], () => r(require('@/page/inter-edit')), 'interEdit')
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
          path: 'interEdit/:id',
          name: 'interEdit',
          component: interEdit
        },
        {
          path: 'interAdd',
          name: 'interAdd',
          component: interAdd
        },
        {
          path: 'menuAdd',
          name: 'menuAdd',
          component: menuAdd
        },
        {
          path: 'menu',
          name: 'menu',
          component: menu
        }, {
          path: 'account',
          name: 'account',
          component: account
        }, {
          path: 'accountAdd',
          name: 'accountAdd',
          component: accountAdd
        },
        {
          path: 'role',
          name: 'role',
          component: role
        },
        {
          path: 'roleAdd',
          name: 'roleAdd',
          component: roleAdd
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
