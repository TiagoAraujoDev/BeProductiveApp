import { AxiosError } from 'axios'

import { api, apiPrivate } from '../config/api/axios'
import { useAuth } from './useAuth'

export const useApiPrivate = () => {
  const { auth } = useAuth()

  interface FailedReqType {
    onSuccess: (token: string) => void
    onFailure: (err: AxiosError) => void
  }

  let isRefreshing = false
  let failedRequestQueue: FailedReqType[] = []

  apiPrivate.interceptors.request.use(
    (config) => {
      if (!config?.headers?.Authorization) {
        config.headers!.Authorization = `Bearer ${auth?.token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  apiPrivate.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const prevRequest = error?.config
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true
        let token = ''

        if (!isRefreshing) {
          isRefreshing = true

          api
            .post(
              '/users/refresh-token',
              {},
              {
                withCredentials: true,
              },
            )
            .then((response) => {
              console.log('b', token)
              failedRequestQueue.forEach((req) => {
                req.onSuccess(response.data.token)
              })
              failedRequestQueue = []
              token = response.data.token
              console.log('tia', token)
            })
            .catch((err) => {
              failedRequestQueue.forEach((req) => {
                req.onFailure(err)
              })
              failedRequestQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              prevRequest.headers.Authorization = `Bearer ${token}`

              resolve(apiPrivate(prevRequest))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      }
      return Promise.reject(error)
    },
  )

  return apiPrivate
}
