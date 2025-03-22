<script setup lang="ts">
const authStore = useAuthStore()
const usersStore = useUsersStore()

const filters = reactive({
  name: '',
  surname: '',
  date: ''
})

onMounted(async () => {
  await usersStore.fetchUsers()
  usersStore.filterUsers(filters)
})

const applyFilters = () => {
  usersStore.filterUsers(filters)
}

const handleLogout = () => {
  authStore.logout()
}
</script>

<template>
  <div class="p-8">
    <div class="mb-6 flex gap-4">
      <UInput v-model="filters.name" placeholder="Filter by name" />
      <UInput v-model="filters.surname" placeholder="Filter by surname" />
      <UInput v-model="filters.date" type="date" />
      <UButton @click="applyFilters">Apply Filters</UButton>
    </div>

    <UTable :data="usersStore.filteredUsers" />

    <UButton class="mt-6" @click="handleLogout">Logout</UButton>
  </div>
</template>