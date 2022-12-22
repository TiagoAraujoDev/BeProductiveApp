import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../config/api/axios'

interface SessionContextProviderProps {
  children: ReactNode
}

interface SessionContextType {
  registerUser: () => Promise<void>
}

export const SessionContext = createContext({} as SessionContextType)

export function SessionContextProvider({
  children,
}: SessionContextProviderProps) {
  // const [token, setToken] = useState<string>('')

  const registerUser = async () => {
    try {
      const newUser = {
        name: 'Andre Souto',
        username: 'zigzig',
        email: 'asazig@gmail.com',
        password: 'r2x2q4f2',
      }

      const response = await api.post('/users', newUser)

      console.log(response.data)
    } catch (err: any) {
      console.log(err.response.data.message)
      console.log(err.response)
    }
  }

  return (
    <SessionContext.Provider value={{ registerUser }}>
      {children}
    </SessionContext.Provider>
  )
}
