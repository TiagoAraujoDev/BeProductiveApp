import * as RadixAvatar from '@radix-ui/react-avatar'
import { AvatarImage } from './styles'

export const Avatar = () => {
  return (
    <button style={{ background: 'transparent', border: 'none' }}>
      <RadixAvatar.Root>
        <AvatarImage
          src="https://avatars.githubusercontent.com/TiagoAraujoDev"
          alt="avatar image"
        />
        <RadixAvatar.Fallback />
      </RadixAvatar.Root>
    </button>
  )
}
