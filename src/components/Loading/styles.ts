import styled from 'styled-components'

type LoadingProps = {
  height: string
}
export const LoadingContainer = styled.div<LoadingProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => props.height};
`
