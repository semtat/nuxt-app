import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const errorMessage = ref('')
  
  const authenticate = async (username: string, password: string) => {
    try {
      const response = await $fetch('/api/auth', {
        method: 'POST',
        body: {
          username: username,
          password: password
        }
      })
  
      if (response.success) {
        login()
        errorMessage.value = ''
      } else {
        errorMessage.value = 'Неверный логин или пароль. Попробуйте ещё раз.'
      }
    } catch (error) {
      console.error('Error: ', error)
      errorMessage.value = 'Ошибка авторизации. Попробуйте позже'
    }  
  }
 
  function login() {
    useCookie('auth').value = 'true'
    isAuthenticated.value = true
    navigateTo('/account')
  }
  
  function logout() {
    useCookie('auth').value = null
    isAuthenticated.value = false
    navigateTo('/login')
  }

  return { isAuthenticated, errorMessage, authenticate, login, logout }
})