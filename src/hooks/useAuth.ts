import { useContext } from 'react'

import { SessionContext } from '../contexts/SessionContext'

export const useAuth = () => {
  return useContext(SessionContext)
}
