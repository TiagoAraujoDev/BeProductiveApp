import styled from 'styled-components'

export const EmptyTaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  span {
    color: ${(props) => props.theme['gray-500']};
    font-size: 2rem;
    font-weight: bold;
  }

  span:last-child {
    color: ${(props) => props.theme['gray-500']};
    font-size: 1.5rem;
  }
`
