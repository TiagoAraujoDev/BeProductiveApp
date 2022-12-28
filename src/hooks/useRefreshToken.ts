import { api } from '../config/api/axios'
import { useAuth } from './useAuth'

export const useRefreshToken = () => {
  const { updateAuthToken } = useAuth()

  const refresh = async () => {
    try {
      const response = await api.post('/users/refresh-token', null, {
        withCredentials: true,
      })

      console.log(response.data.token)
      updateAuthToken(response.data.token)
      return response.data.token
    } catch (err: any) {
      switch (err.response.status) {
        case 401:
          console.log(`${err.response.data.message}`)
          break
        case 403:
          console.log(`${err.response.data.message}`)
          break
        default:
          console.log(`${err.response.data.message}`)
      }
    }
  }

  return refresh
}
