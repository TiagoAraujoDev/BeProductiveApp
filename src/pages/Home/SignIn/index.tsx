import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import * as zod from 'zod'

import { useAuth } from '../../../hooks/useAuth'

import { ErrorContainer, Form, FormContainer } from './styles'

const signInUserFormSchema = zod.object({
  email: zod.string().email('Invalid e-mail!'),
  password: zod
    .string()
    .min(6, 'Require 6 characters at least!')
    .max(24, 'Maximum of 24 characters!'),
})

type SignUserFormData = zod.infer<typeof signInUserFormSchema>

export function SignIn() {
  const { authUser, errorMessage } = useAuth()
  const signInUserFormData = useForm<SignUserFormData>({
    resolver: zodResolver(signInUserFormSchema),
    shouldFocusError: true,
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = signInUserFormData

  useEffect(() => {
    setFocus('email')
  }, [setFocus])

  const submitDone = isSubmitSuccessful

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
        {errors && <ErrorContainer>{errors.email?.message}</ErrorContainer>}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          {...register('password')}
        />
        {errors && <ErrorContainer>{errors.password?.message}</ErrorContainer>}
        {submitDone && <ErrorContainer>{errorMessage}</ErrorContainer>}
        <button type="submit" disabled={isSubmitting}>
          Sign in
        </button>
      </Form>
      <span>Want to create an account?</span>
      <NavLink to={'/signup'}>Sign up</NavLink>
    </FormContainer>
  )
}
