import { defineEventHandler } from 'h3'

function filterUserKeys(users: User[]): FilteredUser[] {
  return users.map(user => ({
    name: user.name,
    surname: user.surname,
    username: user.credentials.username,
    active: user.active,
    created: user.created
  }))
}

export default defineEventHandler(async () => {
  const jsonData = await useStorage().getItem('data:users.json')
  const usersData = JSON.stringify(jsonData)

  if (typeof usersData !== 'string') {
    throw createError({
      statusCode: 500,
      statusMessage: 'Некорректный формат данных'
    })
  }

  const users = JSON.parse(usersData)
  return filterUserKeys(users)
})