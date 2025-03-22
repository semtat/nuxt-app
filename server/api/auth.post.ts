import { defineEventHandler, readBody } from 'h3'
import md5 from 'md5'

export default defineEventHandler(async (event) => {
  const body = await readBody<CredentialsUser>(event)
  
  const jsonData = await useStorage().getItem('data:users.json')
  const usersData = JSON.stringify(jsonData);

  if (typeof usersData !== 'string') {
    throw createError({
      statusCode: 500,
      statusMessage: 'Некорректный формат данных'
    })
  }

  const users = JSON.parse(usersData)
  
  const user = users.find((u: any) => 
    u.credentials.username === body.username &&
    u.credentials.passphrase === md5(body.password)
  )
  
  return { 
    success: !!user,
    user: user || null
  }
})