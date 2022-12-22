import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { SessionContext } from '../../contexts/SessionContext'

export function Home() {
  const { registerUser } = useContext(SessionContext)

  const handleSignIn = async () => {
    registerUser()
  }

  return (
    <div>
      <div>Home1</div>
      <button type="button" onClick={handleSignIn}>
        sign in
      </button>
      <NavLink to={'/signin'}>sign in</NavLink>
      <NavLink to={'/signup'}>sign up</NavLink>
    </div>
  )
}
