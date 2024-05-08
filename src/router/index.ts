import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import EventsView from '../views/OccurrencesView.vue'
import UsersView from '../views/UsersView.vue'
import RegisterView from '../views/RegisterView.vue'
import { authGuard } from '@/router/auth-guard'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    beforeEnter: authGuard,
    children: [
      {
        path: '/events',
        name: 'events',
        component: EventsView,
        beforeEnter: authGuard
      },
      {
        path: '/users',
        name: 'users',
        component: UsersView,
        beforeEnter: authGuard
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
