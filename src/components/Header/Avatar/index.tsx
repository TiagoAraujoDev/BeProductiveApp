import * as RadixAvatar from '@radix-ui/react-avatar'

import { AvatarImage } from './styles'
import imagePlaceholder from '../../../assets/placeholder.png'

interface AvatarProps {
  url: string | undefined
}

export const Avatar = ({ url }: AvatarProps) => {
  const avatar = url || imagePlaceholder

  return (
    <button style={{ background: 'transparent', border: 'none' }}>
      <RadixAvatar.Root>
        <AvatarImage src={avatar} alt="avatar image" />
        <RadixAvatar.Fallback />
      </RadixAvatar.Root>
    </button>
  )
}
