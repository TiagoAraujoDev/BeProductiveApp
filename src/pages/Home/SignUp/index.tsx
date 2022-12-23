import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { SessionContext } from '../../../contexts/SessionContext'
import { Form, FormContainer } from './styles'

export function SignUp() {
  const { registerUser } = useContext(SessionContext)

  const handleSignIn = () => {
    registerUser()
  }
  return (
    <FormContainer>
      <h2>Create an account</h2>
      <Form onSubmit={handleSignIn}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="name" />
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" placeholder="username" />
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" placeholder="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="password" />
        <label htmlFor="match-password">Match password:</label>
        <input
          type="password"
          id="password"
          placeholder="enter the password again"
        />
        <button>Sign up</button>
      </Form>
      <span>Already has a account?</span>
      <NavLink to={'/signin'}>Sign in</NavLink>
    </FormContainer>
  )
}
