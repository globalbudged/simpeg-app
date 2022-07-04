
const routes = [
  {
    path: '/',
    component: () => import('layouts/admins/MainLayout.vue'),
    children: [
      { path: '', redirect: '/dashboard' },
      { path: '/dashboard', name: 'dashboard', component: () => import('pages/dashboard/IndexPage.vue') },
      { path: '/mutasi', name: 'mutasi', component: () => import('pages/mutasi/IndexPage.vue') },
      { path: '/pegawai', name: 'pegawai', component: () => import('pages/master/pegawai/IndexPage.vue') },
      { path: '/components', name: 'components', component: () => import('pages/master/components/IndexPage.vue') },
      { path: '/pendidikan', name: 'pendidikan', component: () => import('pages/master/pendidikan/IndexPage.vue') }
    ],
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/SignIn.vue') }
    ],
    meta: {
      requireAuth: false
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
