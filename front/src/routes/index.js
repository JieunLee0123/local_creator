import Vue from 'vue'
import Router from 'vue-router'
import jsonToCsv from '@/components/jsonToCsv'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'localCreator',
    //   component: localCreatorPage
    // },
    {
      path: '/',
      name: 'jsonToCsv',
      component: jsonToCsv
    },
  ]
})