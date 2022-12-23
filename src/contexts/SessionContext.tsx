import { createContext, ReactNode, useState } from 'react'

interface newUserFormData {
  name: string
  username: string
  email: string
  password: string
}

interface User {
  id: string
  name: string
  username: string
  email: string
  password?: string
  avatar?: string
  created_at?: string
}

interface Auth {
  token: string
  user: {
    name: string
    email: string
  }
}

interface SessionContextProviderProps {
  children: ReactNode
}

interface SessionContextType {
  auth: Auth | undefined
  registerNewUser: (data: newUserFormData) => Promise<void>
  authUser: (data: any) => Promise<void>
}

export const SessionContext = createContext({} as SessionContextType)

export function SessionContextProvider({
  children,
}: SessionContextProviderProps) {
  const [auth, setAuth] = useState<Auth>()
  const [user, setUser] = useState<User>()

  const registerNewUser = async (data: newUserFormData) => {
    try {
      const response = await fetch('https://apifocus.up.railway.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      const responseData: User = await response.json()
      const { avatar, password, created_at: createdAt, ...user } = responseData
      setUser(user)
      console.log(user)
    } catch (err: any) {
      console.log(err.response.data.message)
    }
  }

  const authUser = async (data: any) => {
    try {
      const response = await fetch(
        'https://apifocus.up.railway.app/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        },
      )

      const responseData: Auth = await response.json()
      setAuth(responseData)
      console.log(responseData)
    } catch (error: any) {}
  }

  return (
    <SessionContext.Provider value={{ registerNewUser, authUser, auth }}>
      {children}
    </SessionContext.Provider>
  )
}
