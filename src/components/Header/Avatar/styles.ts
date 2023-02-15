import styled from 'styled-components'
import * as Radix from '@radix-ui/react-avatar'

export const AvatarImage = styled(Radix.Image)`
  width: 4rem;
  height: 4rem;
  border: 2px solid ${(props) => props.theme['gray-900']};
  outline: 3px solid ${(props) => props.theme['green-500']};
  border-radius: 50%;
`
