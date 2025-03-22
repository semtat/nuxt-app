import { defineEventHandler } from 'h3'

function filterUserKeys(users: User[]): FilteredUser[] {
  return users.map(user => ({
    name: user.name,
    surname: user.surname,
    username: user.credentials.username,
    active: user.active,
    created: user.created,
  }))
}

export default defineEventHandler(async () => {
  const usersData = await useStorage().getItem('data:users.json')

  if (!Array.isArray(usersData)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Некорректный формат данных'
    })
  }
  
  return filterUserKeys(usersData as User[])
})