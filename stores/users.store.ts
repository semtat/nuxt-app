import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const users = ref<FilteredUser[]>([])
  const filteredUsers = ref<FilteredUser[]>([])

  // Загрузка пользователей из API
  const fetchUsers = async () => {
    try {
      const data = await $fetch<FilteredUser[]>('/api/users')
      users.value = data
      filteredUsers.value = data 
    } catch (error) {
      console.error('Failed to fetch users:', error)
      throw new Error('Failed to load users data')
    }
  }

  const filterUsers = (filters: { name?: string; surname?: string; date?: string }) => {
    filteredUsers.value = users.value.filter(user => {
      const dateMatch = filters.date
        ? new Date(user.created).toLocaleDateString() === new Date(filters.date).toLocaleDateString()
        : true

      const nameMatch = filters.name ? user.name.includes(filters.name) : true
      const surnameMatch = filters.surname ? user.surname.includes(filters.surname) : true

      return dateMatch && nameMatch && surnameMatch
    })
  }

  return { users, filteredUsers, fetchUsers, filterUsers }
})