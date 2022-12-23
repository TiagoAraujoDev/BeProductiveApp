import { NavLink } from 'react-router-dom'

import { Form, FormContainer } from './styles'

export function SignIn() {
  return (
    <FormContainer>
      <h2>Sign In</h2>
      <Form>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" placeholder="Email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Password" />
        <button>Sign in</button>
      </Form>
      <span>Want to create an account?</span>
      <NavLink to={'/signup'}>Sign up</NavLink>
    </FormContainer>
  )
}
