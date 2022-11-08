import { Circle, Trash } from 'phosphor-react'
import { TaskCardContainer } from './styles'

export function TaskCard() {
  return (
    <TaskCardContainer>
      <Circle size={24} color="#555" />
      <p>
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
        cillum sint consectetur cupidatat.
      </p>
      <Trash size={24} color="#555" />
    </TaskCardContainer>
  )
}
