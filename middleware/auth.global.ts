// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useCookie('auth')
  
  if (to.path === '/login' && auth.value) {
    return navigateTo('/account')
  }
})