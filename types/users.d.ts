export { CredentialsUser, AuthResponse, User, FilteredUser }

declare global {
  interface CredentialsUser {
    username: string
    password: string
  }

  interface AuthResponse {
    success: boolean
    user: User | null
  }
  
  interface User {
    name: string
    surname: string
    credentials: {
      username: string
      passphrase: string
    }
    active: boolean
    created: string
    _comment?: string 
  }

  interface FilteredUser {
    name: string
    surname: string
    username: string
    active: boolean
    created: string
  }
}
