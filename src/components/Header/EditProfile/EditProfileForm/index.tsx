import { useFormContext } from 'react-hook-form'

export const EditProfileForm = () => {
  const { register } = useFormContext()

  return (
    <>
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        placeholder="Username"
        {...register('username')}
      />
      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        autoComplete="off"
        placeholder="E-mail"
        {...register('email')}
      />
      <button type="submit">Save</button>
    </>
  )
}
