import Vue from 'vue'
import Router from 'vue-router'
import MainSection from '@/components/MainSection'
import DayView from '@/components/DayView'
import About from '@/components/About'
import ShuffleView from '@/components/ShuffleView'
import Search from '@/components/Search'
import Lab from '@/components/Lab'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainSection
    },
    {
      path: '/dayView/:date',
      component: DayView
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/shuffle',
      component: ShuffleView
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/search/:page',
      component: Search
    },
    {
      path: '/lab',
      component: Lab
    }
  ]
})
