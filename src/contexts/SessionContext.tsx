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
        name: 'Lucca souto',
        username: 'new',
        email: 'iasa@hotmail.com',
        password: 'iureyt',
      }

      const response = await fetch('https://apifocus.up.railway.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newUser),
      })

      const data = await response.json()

      /*       const response = await api.post('/users', newUser, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }) */

      console.log(data)
    } catch (err: any) {
      console.log(err.response.data.message)
    }
  }

  return (
    <SessionContext.Provider value={{ registerUser }}>
      {children}
    </SessionContext.Provider>
  )
}
