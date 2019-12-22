const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'top-layout',
    meta: { requiresAuth: true },
    component: () => import('layouts/TopLayout'),
    children: [
      { path: 'home', name: 'home', component: () => import('pages/Home') },
      {
        path: 'restaurants',
        name: 'restaurants',
        component: () => import('pages/Restaurants'),
      },
      { path: 'users', name: 'users', component: () => import('pages/Users') },
      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('pages/Notifications'),
      },
      {
        path: 'master-data',
        name: 'master-data',
        component: () => import('pages/MasterData'),
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('pages/Setting'),
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth-layout',
    meta: { guest: true },
    component: () => import('layouts/AuthLayout'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/Login'),
      },
      // {
      //   path: 'forgot-password',
      //   name: 'forgot-password',
      //   component: () => import('pages/ForgotPassword'),
      // },
      // {
      //   path: 'reset-password',
      //   name: 'reset-password',
      //   component: () => import('pages/ResetPassword'),
      // },
    ],
  },
];
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
