import styled from 'styled-components'

export const TaskCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  height: 4rem;
  border: 1px solid ${(props) => props.theme['gray-400']};
  border-radius: 8px;
  padding: 0 0.5rem;
`
