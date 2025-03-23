<script setup lang="ts">
const authStore = useAuthStore()
const usersStore = useUsersStore()

const filters = reactive({
  name: '',
  surname: '',
  date: ''
})

usersStore.fetchUsers()

const applyFilters = () => {
  usersStore.filterUsers(filters)
}

const handleLogout = () => {
  authStore.logout()
}
</script>

<template>
  <div class="p-8">
    <div class="mb-6 flex gap-4 justify-center">
      <UInput v-model="filters.name" placeholder="Поиск по имени" />
      <UInput v-model="filters.surname" placeholder="Поиск по фамилии" />
      <UInput v-model="filters.date" type="date" />
      <UButton @click="applyFilters">Фильтр</UButton>
    </div>

    <UTable :data="usersStore.filteredUsers" />

    <div class="flex justify-center">
      <UButton class="mt-6" @click="handleLogout">Выход</UButton>
    </div>
  </div>
</template>