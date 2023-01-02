import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const AuthRoute = () => {
  const { auth } = useAuth()

  return <>{auth?.token ? <Outlet /> : <Navigate to="/signin" />}</>
}
