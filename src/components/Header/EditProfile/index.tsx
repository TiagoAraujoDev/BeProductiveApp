import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { Content, Ovarlay } from './styles'

interface DialogProps {
  children: ReactNode
}
export const EditProfile = ({ children }: DialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Ovarlay />
        <Content>
          <Dialog.Title>Edit your profile</Dialog.Title>
          <Dialog.Description>
            Some description that I&apos;ll put latter
          </Dialog.Description>
          {/* Form Start */}
          <form>
            <input type="file" name="avatar" id="avatar" />
            <label htmlFor="username">username</label>
            <input type="text" name="username" id="username" />
          </form>
          {/* Form End */}
          <Dialog.Close />
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
