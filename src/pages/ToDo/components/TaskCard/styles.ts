import styled from 'styled-components'

export const TaskCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  background-color: ${(props) => props.theme['gray-800']};
  height: 4rem;
  border-radius: 8px;
  padding: 0 0.5rem;
  margin-bottom: 1rem;

  button {
    background-color: transparent;
    border: none;
  }
`
