import styled from 'styled-components'

export const TaskContainer = styled.div`
  width: 80%;
  margin: 0.5rem auto;
`

export const TasksBox = styled.div`
  width: 100%;
  height: 5rem;
`

export const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 0.875rem;

  div {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;

    span:first-child {
      color: ${(props) => props.theme['green-500']};
    }
  }
`

export const TaskCounter = styled.span`
  background-color: ${(props) => props.theme['gray-600']};
  color: ${(props) => props.theme['gray-300']};
  font-weight: bold;
  border-radius: 6px;
  padding: 0 0.25rem;
`

export const TaskCardsBox = styled.div`
  width: 100%;
  height: 5rem;
  padding-top: 1rem;
  border-radius: 8px;
  border-top: 1px solid ${(props) => props.theme['gray-500']};
`
