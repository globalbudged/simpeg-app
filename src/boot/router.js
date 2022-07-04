import { boot } from 'quasar/wrappers'
// import store from '../store'
// import { LocalStorage } from 'quasar'

let routerInstance = null

export default boot(({ router }) => {
  // router.beforeEach((to, from, next) => {
  //   const requireAuth = to.matched.some(record => record.meta.requireAuth)
  //   if (requireAuth) {
  //     if (LocalStorage.getItem('token') === null || LocalStorage.getItem('token') === undefined) {
  //       next({ path: '/login' })
  //     } else {
  //       next()
  //     }
  //   } else {
  //     next()
  //   }
  // })
  routerInstance = router
})

export { routerInstance }
