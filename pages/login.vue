<script setup lang="ts">
import { storeToRefs } from "pinia"

const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const handleLogin = () => authStore.authenticate(username.value, password.value) 
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Вход в систему
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <UAlert
          v-if="authStore.errorMessage"
          type="error"
          :title="authStore.errorMessage"
          class="mb-4"
        />
        <div>
          <label for="username" class="sr-only">Логин</label>
          <UInput
            id="username"
            v-model="username"
            type="text"
            placeholder="Введите логин"
            required
            class="w-full"
          />
        </div>

        <div>
        <label for="password" class="sr-only">Пароль</label>
        <UInput
          id="password"
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          required
          class="w-full"
        />
        </div>

        <div>
          <UButton
            type="submit"
            color="primary"
            class="w-full text-center"
          >
            Войти
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>