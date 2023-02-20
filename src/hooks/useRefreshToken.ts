import { useNavigate } from 'react-router-dom'

import { api } from '../config/api/axios'
import { useAuth } from './useAuth'

export const useRefreshToken = () => {
  const { updateAuthToken } = useAuth()
  const navigate = useNavigate()

  const refresh = async () => {
    try {
      const response = await api.post(
        '/users/refresh-token',
        {},
        {
          withCredentials: true,
        },
      )

      updateAuthToken(response.data.token)
      return response.data.token
    } catch (err: any) {
      switch (err.response.status) {
        case 401:
          console.log(`refreshHook error(401): ${err.response.data.message}`)
          break
        case 403:
          console.log(`refreshHook error(403): ${err.response.data.message}`)
          break
        default:
          console.log(`refreshHook error: ${err.response.data.message}`)
      }
    }
  }

  return refresh
}
