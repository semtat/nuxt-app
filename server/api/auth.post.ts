import { defineEventHandler, readBody } from 'h3'
import md5 from 'md5'

export default defineEventHandler(async (event) => {
  const body = await readBody<CredentialsUser>(event)
  
  const users = await useStorage().getItem<User[]>('data:users.json') || []

  const user = users.find((u: any) =>
    u.credentials.username === body.username &&
    u.credentials.passphrase === md5(body.password)
  )
  
  return { 
    success: !!user,
    user: user || null
  }
})