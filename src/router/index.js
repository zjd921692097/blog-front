import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/read',
          component: r => require.ensure([], () => r(require('@/pages/read')), 'read')
        },
        {
          path: '/',
          component: r => require.ensure([], () => r(require('@/pages/Index')), 'index')
        },
        {
          path: '/write',
          component: r => require.ensure([], () => r(require('@/pages/write')), 'write')
        },
      ]
    },
    {path: '/blogTag', name: 'blogTag', component: page('blogTag')}
  ]
})
