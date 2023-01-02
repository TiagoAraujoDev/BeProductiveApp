import { useEffect } from 'react'

import { apiPrivate } from '../config/api/axios'
import { useAuth } from './useAuth'
import { useRefreshToken } from './useRefreshToken'

export const useApiPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {
    console.log('interceptors', auth)
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config) => {
        if (!config?.headers?.Authorization) {
          console.log('interceptors>if', auth)
          config.headers!.Authorization = `Bearer ${auth?.token}`
        }
        return config
      },
      (error) => {
        console.log('error => req')
        return Promise.reject(error)
      },
    )

    const responseIntercept = apiPrivate.interceptors.response.use(
      (response) => {
        console.log(response)
        return response
      },
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newToken = await refresh()
          prevRequest.headers.Authorization = `Bearer ${newToken}`
          return apiPrivate(prevRequest)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept)
      apiPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return apiPrivate
}
