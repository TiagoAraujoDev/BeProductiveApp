import styled from 'styled-components'

export const TaskContainer = styled.div`
  width: 80%;
  margin: 0rem auto;

  img {
    display: block;
    margin: 0 auto;
  }
`

export const TasksBox = styled.div`
  width: 100%;
  height: auto;
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
  height: 1.5rem;
  font-weight: bold;
  font-size: 0.875rem;
  border-radius: 99999px;
  padding: 0 0.25rem 0 0.2rem;
  line-height: 1.5rem;
`

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TaskCardsBox = styled.div`
  width: 100%;
  padding-top: 1rem;
  border-radius: 8px;
  border-top: 1px solid ${(props) => props.theme['gray-500']};
`
