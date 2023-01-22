import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  avatar?: string
  created_at?: string
}

interface Auth {
  token: string
  user?: {
    id: string
    email: string
  }
}

interface SessionContextProviderProps {
  children: ReactNode
}

interface SessionContextType {
  auth: Auth
  errorMessage: string
  statusOk: boolean
  registerNewUser: (data: NewUserFormData) => Promise<void>
  authUser: (data: any) => Promise<void>
  updateAuthToken: (token: string) => void
}

export const SessionContext = createContext({} as SessionContextType)

export const SessionContextProvider = ({
  children,
}: SessionContextProviderProps) => {
  const [auth, setAuth] = useState<Auth>({} as Auth)
  const [_, setUser] = useState<User>()
  const [statusOk, setStatusOk] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()

  const registerNewUser = async (data: NewUserFormData) => {
    try {
      const response = await api.post('/users', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      const responseData: User = await response.data

      const { avatar, created_at: createdAt, ...user } = responseData

      console.log("session provider", statusOk)
      setUser(user)
      setStatusOk(true)
    } catch (err: any) {
      switch (err.response.status) {
        case 400:
          setErrorMessage(err.response.data.message)
          break
        case 409:
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
      console.log(responseData)
      setAuth(responseData)
      navigate('/')
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

  const updateAuthToken = (token: string): void => {
    setAuth((state) => {
      if (state) {
        return {
          ...state,
          token,
        }
      }
      return {
        token,
      }
    })
  }

  return (
    <SessionContext.Provider
      value={{
        registerNewUser,
        authUser,
        auth,
        errorMessage,
        statusOk,
        updateAuthToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
