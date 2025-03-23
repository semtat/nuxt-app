import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const users = ref<FilteredUser[]>([])
  const filteredUsers = ref<FilteredUser[]>([])

  const fetchUsers = async () => {
    try {
      const data = await $fetch<FilteredUser[]>('/api/users')
      users.value = data
      filteredUsers.value = data
    } catch (error) {
      console.error(error);
    }
  }

  const filterUsers = (filters: { name?: string; surname?: string; date?: string }) => {
    filteredUsers.value = users.value.filter(user => {
      const dateMatch = filters.date
        ? new Date(user.created).toLocaleDateString() === new Date(filters.date).toLocaleDateString()
        : true

      const nameMatch = filters.name ? user.name.toLowerCase().includes(filters.name.toLowerCase()) : true
      const surnameMatch = filters.surname ? user.surname.toLowerCase().includes(filters.surname.toLowerCase()) : true

      return dateMatch && nameMatch && surnameMatch
    })
  }

  return { users, filteredUsers, fetchUsers, filterUsers }
})