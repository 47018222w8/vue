import Vue from 'vue'
import Router from 'vue-router'
const home = r => require.ensure([], () => r(require('@/page/home')), 'home')
const login = r => require.ensure([], () => r(require('@/page/login')), 'login')
const role = r => require.ensure([], () => r(require('@/page/role')), 'role')
const roleAdd = r => require.ensure([], () => r(require('@/page/role-add')), 'roleAdd')
const roleEdit = r => require.ensure([], () => r(require('@/page/role-edit')), 'roleEdit')
const menu = r => require.ensure([], () => r(require('@/page/menu')), 'menu')
const menuAdd = r => require.ensure([], () => r(require('@/page/menu-add')), 'menuAdd')
const account = r => require.ensure([], () => r(require('@/page/account')), 'account')
const accountEdit = r => require.ensure([], () => r(require('@/page/account-edit')), 'accountEdit')
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
      meta: { name: '首页' },
      children: [
        {
          path: 'inter',
          name: 'inter',
          component: inter,
          meta: { name: '接口' }
        },
        {
          path: 'interEdit/:id',
          name: 'interEdit',
          component: interEdit,
          meta: { name: '编辑接口', noTag: true }
        },
        {
          path: 'interAdd',
          name: 'interAdd',
          component: interAdd,
          meta: { name: '添加接口' }
        },
        {
          path: 'menuAdd',
          name: 'menuAdd',
          component: menuAdd,
          meta: { name: '添加菜单' }
        },
        {
          path: 'menu',
          name: 'menu',
          component: menu,
          meta: { name: '菜单' }
        }, {
          path: 'account',
          name: 'account',
          component: account,
          meta: { name: '账号' }
        }, {
          path: 'accountEdit/:id',
          name: 'accountEdit',
          component: accountEdit,
          meta: { name: '编辑账号', noTag: true }
        }, {
          path: 'accountAdd',
          name: 'accountAdd',
          component: accountAdd,
          meta: { name: '添加账号' }
        },
        {
          path: 'role',
          name: 'role',
          component: role,
          meta: { name: '角色' }
        },
        {
          path: 'roleAdd',
          name: 'roleAdd',
          component: roleAdd,
          meta: { name: '添加角色' }
        },
        {
          path: 'roleEdit/:id',
          name: 'roleEdit',
          component: roleEdit,
          meta: { name: '编辑角色', noTag: true }
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
