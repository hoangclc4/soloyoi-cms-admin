import Login from '@/components/Login'
import Home from '@/components/Home'

export const navBarList = [
  {
    id: 1,
    pageName: 'Login Page',
    path: '/signin',
    routeName: 'Login',
    routeComponent: Login
  },
  {
    id: 2,
    pageName: 'Home Page',
    path: '/home',
    routeName: 'Home',
    routeComponent: Home
  }
]
