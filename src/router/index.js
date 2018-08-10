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
          path: '/viewBlog',
          name:"viewBlog",
          component: r => require.ensure([], () => r(require('@/pages/viewBlog')), 'viewBlog')
        },
        {
          path: '/',
          component: r => require.ensure([], () => r(require('@/pages/Index')), 'index')
        },
        {
          path: '/write',
          component: r => require.ensure([], () => r(require('@/pages/write')), 'write')
        },
        {
          path: '/diary',
          component: r => require.ensure([], () => r(require('@/pages/diary')), 'diary')
        },
        {
          path: '/read',
          component: r => require.ensure([], () => r(require('@/pages/read')), 'read')
        },

      ]
    },
    {path: '/blogTag', name: 'blogTag', component: page('blogTag')},
//    {path: '/read', name: 'read', component: page('read')}
  ]
})
