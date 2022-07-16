import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { LocalStorage } from 'quasar'
// import { http } from 'boot/axios'
// import store from '../store'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

// const store = inject('store')

export default route(function (/* { ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })
  // const auth = store.auth.state.authenticate
  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth) && !LocalStorage.getItem('token')) {
      next({ path: '/login' })
    } else if (!to.matched.some(record => record.meta.requireAuth) && LocalStorage.getItem('token')) {
      next({ path: '/' })
    } else {
      next()
    }
  })

  Router.onError(error => {
    console.log('router', error)
  })

  return Router
})
