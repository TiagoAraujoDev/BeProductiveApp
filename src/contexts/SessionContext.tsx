import { AxiosError } from 'axios'
import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../config/api/axios'
import { useApiPrivate } from '../hooks/useAxiosPrivate'

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

interface UserProfileData {
  username?: string
  email?: string
}

interface User {
  id: string
  name: string
  username: string
  email: string
  avatar?: string
  created_at?: string
}

export interface Auth {
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
  auth: Auth | undefined
  user: User | undefined
  errorMessage: string
  registerNewUser: (data: NewUserFormData) => Promise<boolean | undefined>
  authUser: (data: any) => Promise<void>
  updateAuthToken: (token: string) => void
  avatarUpload: (file: File) => void
  fetchUserData: (controller: AbortController) => void
  updateUserProfile: (data: UserProfileData) => void
}

export const SessionContext = createContext({} as SessionContextType)

export const SessionContextProvider = ({
  children,
}: SessionContextProviderProps) => {
  const [auth, setAuth] = useState<Auth>()
  const [user, setUser] = useState<User>()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const apiPrivate = useApiPrivate()
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
      const { created_at: createdAt, ...user } = responseData
      setUser(user)

      return true
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

  const fetchUserData = async (controller: AbortController) => {
    try {
      const response = await apiPrivate('/users/user', {
        signal: controller.signal,
      })
      setUser(response.data)
    } catch (err: any) {
      if (err instanceof AxiosError && err.response?.status === 403) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
        navigate('/')
      }
    }
  }

  const updateUserProfile = async (data: UserProfileData) => {
    try {
      await apiPrivate.post('/users/user', data)
    } catch (err: any) {
      if (err instanceof AxiosError && err.response?.status === 403) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
        navigate('/')
      }
    }
  }

  const avatarUpload = async (file: File) => {
    try {
      const uploadAvatarForm = new FormData()
      uploadAvatarForm.append('avatar', file)

      await apiPrivate.post('users/avatar', uploadAvatarForm)
    } catch (err: any) {
      if (err instanceof AxiosError && err.response?.status === 403) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
        navigate('/')
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

      const responseData = response.data
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
    setAuth({ token })
  }

  return (
    <SessionContext.Provider
      value={{
        registerNewUser,
        authUser,
        auth,
        user,
        errorMessage,
        updateAuthToken,
        avatarUpload,
        fetchUserData,
        updateUserProfile,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
