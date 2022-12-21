import styled from 'styled-components'

export const TaskCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* gap: 0rem; */
  height: 4rem;
  border-radius: 8px;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme['gray-800']};
`

const TaskContentBase = styled.p`
  width: 100%;
`

export const TaskContentContainer = styled(TaskContentBase)`
  color: ${(props) => props.theme['gray-100']};
`

export const TaskContentContainerDone = styled(TaskContentBase)`
  text-decoration: line-through;
  color: ${(props) => props.theme['gray-400']};
`

const BaseButton = styled.button`
  border: none;
  background-color: transparent;
  box-shadow: none;
  cursor: pointer;
`
export const CheckButton = styled(BaseButton)`
  padding: 0rem 0.5rem;
  line-height: 0;
`

export const PlayButton = styled(BaseButton)`
  margin-right: 0.5rem;
  line-height: 0;

  svg {
    color: ${(props) => props.theme['gray-500']};
    &:hover {
      color: ${(props) => props.theme['green-500']};
      transition: color 0.2s ease;
    }
  }
`

export const TrashButton = styled(BaseButton)`
  margin-right: 0.5rem;
  line-height: 0;

  svg {
    color: ${(props) => props.theme['gray-500']};
    &:hover {
      color: ${(props) => props.theme['red-500']};
      transition: color 0.2s ease;
    }
  }
`
