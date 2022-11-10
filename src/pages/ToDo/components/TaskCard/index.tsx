import { CheckCircle, Circle, Trash } from 'phosphor-react'
import { useContext } from 'react'

import { TaskContext } from '../../../../contexts/TasksContext'

import {
  TaskCardContainer,
  TaskContentContainer,
  TaskContentContainerDone,
} from './styles'

interface TaskCardProps {
  id: string
  text: string
  isTaskComplete: boolean
}

export function TaskCard({ text, id, isTaskComplete }: TaskCardProps) {
  const { handleToggleTaskDone, handleDeleteTask } = useContext(TaskContext)

  return (
    <TaskCardContainer>
      {isTaskComplete ? (
        <button onClick={() => handleToggleTaskDone(id)}>
          <CheckCircle size={24} weight="fill" color="#00875F" />
        </button>
      ) : (
        <button onClick={() => handleToggleTaskDone(id)}>
          <Circle size={24} color="#555" />
        </button>
      )}
      {isTaskComplete ? (
        <TaskContentContainerDone>{text}</TaskContentContainerDone>
      ) : (
        <TaskContentContainer>{text}</TaskContentContainer>
      )}
      <button onClick={() => handleDeleteTask(id)}>
        <Trash size={24} color="#555" />
      </button>
    </TaskCardContainer>
  )
}
