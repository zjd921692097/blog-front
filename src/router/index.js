import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Router from 'vue-router'
import Home from '@/Home'

Vue.use(Router)
Vue.use(VueAwesomeSwiper, /*{ default global options}*/)
const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'history',
  base: '/',
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
          component: r => require.ensure([], () => r(require('@/pages/index')), 'index')
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
        {
          path: '/flower',
          component: r => require.ensure([], () => r(require('@/pages/flower')), 'flower')
        },
        {
          path: '/community',
          component: r => require.ensure([], () => r(require('@/pages/community')), 'read')
        },

      ]
    },
    {path: '/blogTag', name: 'blogTag', component: page('blogTag')},
//    {path: '/read', name: 'read', component: page('read')}
  ]
})
