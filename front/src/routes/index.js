import Vue from 'vue'
import Router from 'vue-router'
import localCreatorPage from '@/components/localCreatorPage'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'localCreator',
      component: localCreatorPage
    },
  ]
})