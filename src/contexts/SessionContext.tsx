import { createContext, ReactNode, useState } from 'react'
import { api } from '../config/api/axios'

interface NewUserFormData {
  name: string
  username: string
  email: string
  password: string
}

interface SignInFormData {
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
  errorMessage: string
  registerNewUser: (data: NewUserFormData) => Promise<void>
  authUser: (data: any) => Promise<void>
}

export const SessionContext = createContext({} as SessionContextType)

export function SessionContextProvider({
  children,
}: SessionContextProviderProps) {
  const [auth, setAuth] = useState<Auth>()
  const [user, setUser] = useState<User>()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const registerNewUser = async (data: NewUserFormData) => {
    try {
      const response = await api.post('/users', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      const responseData: User = await response.data

      const { avatar, password, created_at: createdAt, ...user } = responseData

      setUser(user)
    } catch (err: any) {
      switch (err.response.status) {
        case 400:
          setErrorMessage(err.response.data.message)
          break
        default:
          setErrorMessage('Unexpected Error!')
      }
    }
  }

  const authUser = async (data: SignInFormData) => {
    try {
      const response = await api.post('/users/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      const responseData: Auth = await response.data
      setAuth(responseData)
    } catch (err: any) {
      switch (err.response.status) {
        case 400:
          setErrorMessage(err.response.data.message)
          break
        default:
          setErrorMessage('Unexpected Error!')
      }
    }
  }

  return (
    <SessionContext.Provider
      value={{ registerNewUser, authUser, auth, errorMessage }}
    >
      {children}
    </SessionContext.Provider>
  )
}
