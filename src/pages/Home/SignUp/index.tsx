import { NavLink, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { useAuth } from '../../../hooks/useAuth'

import { ErrorContainer, Form, FormContainer } from './styles'

const registerNewUserFormSchema = zod.object({
  name: zod.string().min(1, 'Field required!'),
  username: zod.string().min(1, 'Field required!'),
  email: zod.string().email('Invalid email!'),
  password: zod
    .string()
    .min(6, 'Require 6 characters at least!')
    .max(24, 'Maximum of 24 characters!'),
})

type RegisterNewUserFormData = zod.infer<typeof registerNewUserFormSchema>

export function SignUp() {
  const navigate = useNavigate()
  const { registerNewUser, statusOk, errorMessage } = useAuth()
  const newUserForm = useForm<RegisterNewUserFormData>({
    resolver: zodResolver(registerNewUserFormSchema),
    mode: 'all',
    shouldFocusError: true,
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })

  const {
    register,
    formState: { isSubmitting, errors },
    reset,
    handleSubmit,
  } = newUserForm

  const handleSignUp = async (data: RegisterNewUserFormData) => {
    await registerNewUser(data)
    reset()
    if (statusOk) navigate('/signin')
  }

  return (
    <FormContainer>
      <h2>Create an account</h2>
      <Form onSubmit={handleSubmit(handleSignUp)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Name" {...register('name')} />
        {errors.name && <ErrorContainer>{errors.name?.message}</ErrorContainer>}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          {...register('username')}
        />
        {errors.username && (
          <ErrorContainer>{errors.username?.message}</ErrorContainer>
        )}
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && (
          <ErrorContainer>{errors.email?.message}</ErrorContainer>
        )}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && (
          <ErrorContainer>{errors.password?.message}</ErrorContainer>
        )}
        {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
        <button type="submit" disabled={isSubmitting}>
          Sign up
        </button>
      </Form>
      <span>Already has an account?</span>
      <NavLink to={'/signin'}>Sign in</NavLink>
    </FormContainer>
  )
}
