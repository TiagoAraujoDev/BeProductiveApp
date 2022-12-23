import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { SessionContext } from '../../../contexts/SessionContext'

import { Form, FormContainer } from './styles'

const registerNewUserFormSchema = zod.object({
  name: zod.string().min(3, 'Enter at least your first name!'),
  username: zod.string().min(3, 'Enter at least 3 characters'),
  email: zod.string().email(),
  password: zod
    .string()
    .min(6, 'Password most have at least 6 characters!')
    .max(24, 'Password most have a limit of 24 characters!'),
})

type registerNewUserFormData = zod.infer<typeof registerNewUserFormSchema>

export function SignUp() {
  const { registerNewUser } = useContext(SessionContext)
  const newUserForm = useForm<registerNewUserFormData>({
    resolver: zodResolver(registerNewUserFormSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })

  const { register, watch, reset, handleSubmit } = newUserForm

  const handleSignIn = (data: registerNewUserFormData) => {
    registerNewUser(data)
    reset()
  }

  return (
    <FormContainer>
      <h2>Create an account</h2>
      <Form onSubmit={handleSubmit(handleSignIn)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Name" {...register('name')} />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          {...register('username')}
        />
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
        <button type="submit">Sign up</button>
      </Form>
      <span>Already has an account?</span>
      <NavLink to={'/'}>Sign in</NavLink>
    </FormContainer>
  )
}
