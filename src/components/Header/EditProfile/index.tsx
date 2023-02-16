import * as Dialog from '@radix-ui/react-dialog'
import { Camera, X } from 'phosphor-react'
import React, { ReactNode, useContext, useState } from 'react'
import { SessionContext } from '../../../contexts/SessionContext'

import { Avatar, Close, Content, Form, Ovarlay, Title } from './styles'

interface DialogProps {
  children: ReactNode
}

export const EditProfile = ({ children }: DialogProps) => {
  const { avatarUpload } = useContext(SessionContext)
  const [avatar, setAvatar] = useState('')

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files![0]
      if (file) {
        avatarUpload(file)
      }
      const imagePreview = URL.createObjectURL(file)
      setAvatar(imagePreview)
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Ovarlay />
        <Content>
          <Title>Edit your profile</Title>
          <Avatar>
            <img
              src={
                avatar || 'https://avatars.githubusercontent.com/TiagoAraujoDev'
              }
              alt="avatar profile"
            />
            <label htmlFor="avatar">
              <Camera size={16} />
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleAvatarUpload}
              />
            </label>
          </Avatar>
          <Form>
            <label htmlFor="username">username</label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              placeholder="Username"
            />
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="E-mail"
            />
            <button>Save</button>
          </Form>
          {/* Form End */}
          <Close asChild>
            <X />
          </Close>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
