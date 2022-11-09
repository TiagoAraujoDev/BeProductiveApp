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
  }
`

// TODO: Set content position to the start of the container
export const TaskContentContainer = styled.p`
  /* width: 100%; */
  /* margin: 0 auto 0.5rem 0; */
  display: flex;
  justify-content: flex-start;
  color: ${(props) => props.theme['gray-100']};
`
