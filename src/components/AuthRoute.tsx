import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const AuthRoute = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return (
    <>
      {auth?.token ? (
        <Outlet />
      ) : (
        <Navigate to={'/'} state={{ from: location }} replace />
      )}
    </>
  )
}
