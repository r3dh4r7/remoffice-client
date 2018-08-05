import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

// Layouts
import AppLayout from '../layouts/App'

// Views
import Dashboard from '../views/Dashboard'
import Switches from '../views/Switches'
import Storage from '../views/Storage'
import Surveillance from '../views/Surveillance'
import Server from '../views/Server'

Vue.use(Router)
NProgress.configure({ showSpinner: false, trickleRate: 0.02, trickleSpeed: 200 })

const router = new Router({
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          redirect: 'dashboard'
        },
        {
          path: 'dashboard',
          name: 'dashboardView',
          component: Dashboard
        },
        {
          path: 'switches',
          name: 'switchesView',
          component: Switches
        },
        {
          path: 'storage',
          name: 'storageView',
          component: Storage
        },
        {
          path: 'surveillance',
          name: 'surveillanceView',
          component: Surveillance
        },
        {
          path: 'server',
          name: 'serverView',
          component: Server
        }
      ]
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from, next) => {
  setTimeout(() => NProgress.done(), 1000)
})

export default router
