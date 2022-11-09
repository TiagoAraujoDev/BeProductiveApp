import { Circle, Trash } from 'phosphor-react'
import { TaskCardContainer, TaskContentContainer } from './styles'

interface TaskCardProps {
  text: string
}

export function TaskCard({ text }: TaskCardProps) {
  return (
    <TaskCardContainer>
      <button>
        <Circle size={24} color="#555" />
      </button>
      <TaskContentContainer>{text}</TaskContentContainer>
      <button>
        <Trash size={24} color="#555" />
      </button>
    </TaskCardContainer>
  )
}
