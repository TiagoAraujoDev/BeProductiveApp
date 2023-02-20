import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { ReactNode, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { AvatarUpload } from './AvatarUpload'
import { EditProfileForm } from './EditProfileForm'
import { useAuth } from '../../../hooks/useAuth'

import { Avatar, Close, Content, Form, Ovarlay, Title } from './styles'

interface DialogProps {
  children: ReactNode
}

const editProfileFormValidationSchema = zod.object({
  username: zod.string().optional(),
  email: zod.string().optional(),
})

type EditProfileFormData = zod.infer<typeof editProfileFormValidationSchema>

export const EditProfile = ({ children }: DialogProps) => {
  const { updateUserProfile } = useAuth()
  const [hasChanges, setHasChange] = useState<boolean>(false)

  const editProfileForm = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormValidationSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  const { handleSubmit, reset } = editProfileForm

  const handleRefresh = (): void => {
    if (hasChanges) {
      window.location.reload()
    }
  }

  const handleChanges = (): void => {
    setHasChange(true)
  }

  const handleUpdateProfile = (data: EditProfileFormData): void => {
    updateUserProfile(data)
    reset()
    handleChanges()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Ovarlay />
        <Content>
          <Title>Edit your profile</Title>
          <Avatar>
            <AvatarUpload handleChanges={handleChanges} />
          </Avatar>
          <Form onSubmit={handleSubmit(handleUpdateProfile)}>
            <FormProvider {...editProfileForm}>
              <EditProfileForm />
            </FormProvider>
          </Form>
          <Close asChild>
            <button onClick={handleRefresh}>
              <X />
            </button>
          </Close>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
