import { NavLink } from 'react-router-dom'

export function Home() {
  return (
    <div>
      <div>Home</div>
      <NavLink to={'/signin'}>sign in</NavLink>
      <NavLink to={'/signup'}>sign up</NavLink>
    </div>
  )
}
