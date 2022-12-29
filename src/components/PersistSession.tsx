import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRefreshToken } from '../hooks/useRefreshToken'

export const PersistSession = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await refresh()
      } catch (err: any) {
        console.log(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.token ? verifyToken() : setIsLoading(false)
  }, [auth, refresh])

  return <>{isLoading ? <p>is loading...</p> : <Outlet />}</>
}
