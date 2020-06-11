const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'top',
    meta: { requiresAuth: true },
    component: () => import('layouts/TopLayout'),
    children: [
      { path: 'home', name: 'home', component: () => import('pages/Home') },
      {
        path: 'restaurant',
        name: 'restaurant',
        component: () => import('pages/Restaurant'),
      },
      { path: 'user', name: 'user', component: () => import('pages/User') },
      {
        path: 'report',
        name: 'report',
        component: () => import('pages/Report'),
      },
      {
        path: 'notification',
        name: 'notification',
        component: () => import('pages/Notification'),
      },
      {
        path: 'masterdata',
        name: 'masterdata',
        component: () => import('pages/Masterdata'),
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('pages/Setting'),
      },
    ],
  },
  {
    path: '/edit-restaurant/:id',
    name: 'edit-restaurant',
    redirect: '/edit-restaurant/:id/payment',
    meta: { requiresAuth: true },
    component: () => import('layouts/EditRestaurantLayout'),
    children: [
      {
        path: 'payment',
        name: 'edit-restaurant-payment',
        component: () => import('pages/editRestaurant/EditRestaurantPayment'),
      },
      {
        path: 'information',
        name: 'edit-restaurant-information',
        component: () =>
          import('pages/editRestaurant/EditRestaurantInformation'),
      },
      {
        path: 'menu',
        name: 'edit-restaurant-menu',
        component: () => import('pages/editRestaurant/EditRestaurantMenu'),
      },
      {
        path: 'staff',
        name: 'edit-restaurant-staff',
        component: () => import('pages/editRestaurant/EditRestaurantStaff'),
      },
      {
        path: 'review',
        name: 'edit-restaurant-review',
        component: () => import('pages/editRestaurant/EditRestaurantReview'),
      },
      {
        path: 'setting',
        name: 'edit-restaurant-setting',
        component: () => import('pages/editRestaurant/EditRestaurantSetting'),
      },
    ],
  },
  {
    path: '/edit-user/:id',
    name: 'edit-user',
    redirect: '/edit-user/:id/payment',
    meta: { requiresAuth: true },
    component: () => import('layouts/EditUserLayout'),
    children: [
      {
        path: 'payment',
        name: 'edit-user-payment',
        component: () => import('pages/editUser/EditUserPayment'),
      },
      {
        path: 'profile',
        name: 'edit-user-profile',
        component: () => import('pages/editUser/EditUserProfile'),
      },
      {
        path: 'feeling-today',
        name: 'edit-user-feeling-today',
        component: () => import('pages/editUser/EditUserFeelingToday'),
      },
      {
        path: 'user-setting',
        name: 'edit-user-setting',
        component: () => import('pages/editUser/EditUserSetting'),
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
    ],
  },
  {
    path: '/user/reset-password',
    name: 'user-reset-password',
    component: () => import('pages/User/ResetPassword'),
  },
  {
    path: '/restaurant/reset-password',
    name: 'restaurant-reset-password',
    component: () => import('pages/Restaurant/ResetPassword'),
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
