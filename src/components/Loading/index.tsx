import { RotateLoader } from 'react-spinners'

import { LoadingContainer } from './styles'

interface LoadingProps {
  height: string
}

export const Loading = ({ height }: LoadingProps) => {
  return (
    <LoadingContainer height={height}>
      <RotateLoader color="#00B37E" />
    </LoadingContainer>
  )
}
