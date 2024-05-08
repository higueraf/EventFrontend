import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import authService from '@/services/auth.service'

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const currentUser = authService.getCurrentUser()

  if (currentUser && currentUser.token) {
    next()
  } else {
    next('/login')
  }
}
