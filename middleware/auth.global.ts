export default defineNuxtRouteMiddleware((to) => {
  const auth = useCookie('auth')

  if (to.path.startsWith('/api')) {
    return
  }

  if (!auth.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (auth.value && to.path === '/login') {
    return navigateTo('/account')
  }
})
