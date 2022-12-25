import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import * as zod from 'zod'

import { useAuth } from '../../../hooks/useAuth'

import { Form, FormContainer } from './styles'

const signInUserFormSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
})

type SignUserFormData = zod.infer<typeof signInUserFormSchema>

export function SignIn() {
  const { authUser, errorMessage } = useAuth()
  const signInUserFormData = useForm<SignUserFormData>({
    resolver: zodResolver(signInUserFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = signInUserFormData

  const handleSignInUser = async (data: SignUserFormData) => {
    await authUser(data)
  }

  return (
    <FormContainer>
      <h2>Sign In</h2>
      <Form onSubmit={handleSubmit(handleSignInUser)}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder="Email"
          {...register('email')}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          {...register('password')}
        />
        {errorMessage ? (
          <span style={{ color: 'red' }}>{errorMessage}</span>
        ) : null}
        <button type="submit" disabled={isSubmitting}>
          Sign in
        </button>
      </Form>
      <span>Want to create an account?</span>
      <NavLink to={'/signup'}>Sign up</NavLink>
    </FormContainer>
  )
}
