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
  const users = await useStorage().getItem<User[]>('data:users.json') || []

  return filterUserKeys(users)
})