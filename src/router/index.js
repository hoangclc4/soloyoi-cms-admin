import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import { navBarList } from '@/assets/resources/scripts/navbar'

Vue.use(Router)
const routeList = navBarList.map(nav => {
  return {
    path: nav.path,
    name: nav.routeName,
    component: nav.routeComponent
  }
})
export default new Router({
  routes: [
    ...routeList,
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
