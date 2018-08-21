import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import appConfig from '../config'

// Layouts
import MainLayout from '../layouts/Main'
import AppLayout from '../layouts/App'

// Views
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import Switches from '../views/Switches'
import Storage from '../views/Storage'
import Surveillance from '../views/Surveillance'
import Server from '../views/Server'
import Guide from '../views/Guide'
import Error404 from '../views/Error/404'

Vue.use(Router)
NProgress.configure({ showSpinner: false, trickleRate: 0.02, trickleSpeed: 200 })

const requireNoAuth = (to, from, next) => {
  if (localStorage.getItem(appConfig.name + '_' + 'server') &&
    localStorage.getItem(appConfig.name + '_' + 'token')) {
    NProgress.done()
    next({name: 'dashboardView'})
  } else {
    next()
  }
}

const requireAuth = (to, from, next) => {
  if (!localStorage.getItem(appConfig.name + '_' + 'server') ||
    !localStorage.getItem(appConfig.name + '_' + 'token')) {
    NProgress.done()
    next({name: 'loginView'})
  } else {
    next()
  }
}

const router = new Router({
  routes: [
    {
      path: '*',
      component: Error404
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'homeView',
          redirect: 'login'
        },
        {
          path: 'login',
          name: 'loginView',
          component: Login,
          beforeEnter: requireNoAuth
        },
        {
          path: 'app',
          component: AppLayout,
          children: [
            {
              path: '',
              redirect: 'dashboard'
            },
            {
              path: 'dashboard',
              name: 'dashboardView',
              component: Dashboard,
              beforeEnter: requireAuth
            },
            {
              path: 'switches',
              name: 'switchesView',
              component: Switches,
              beforeEnter: requireAuth
            },
            {
              path: 'storage',
              name: 'storageView',
              component: Storage,
              beforeEnter: requireAuth
            },
            {
              path: 'surveillance',
              name: 'surveillanceView',
              component: Surveillance,
              beforeEnter: requireAuth
            },
            {
              path: 'server',
              name: 'serverView',
              component: Server,
              beforeEnter: requireAuth
            },
            {
              path: 'guide',
              name: 'guideView',
              component: Guide,
              beforeEnter: requireAuth
            }
          ]
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
