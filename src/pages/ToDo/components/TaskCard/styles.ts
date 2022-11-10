import styled from 'styled-components'

export const TaskCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 4rem;
  border-radius: 8px;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme['gray-800']};

  button {
    border: none;
    padding: 0 0.5rem;
    background-color: transparent;
    box-shadow: none;
    cursor: pointer;
  }
`

const TaskContentBase = styled.p`
  width: 100%;
  padding: 0 auto 0.5rem 0;
`

export const TaskContentContainer = styled(TaskContentBase)`
  color: ${(props) => props.theme['gray-100']};
`

export const TaskContentContainerDone = styled(TaskContentBase)`
  text-decoration: line-through;
  color: ${(props) => props.theme['gray-400']};
`
