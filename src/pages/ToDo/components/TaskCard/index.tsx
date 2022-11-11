import { CheckCircle, Circle, Trash } from 'phosphor-react'
import { useContext } from 'react'

import { Task, TaskContext } from '../../../../contexts/TasksContext'

import {
  TaskCardContainer,
  TaskContentContainer,
  TaskContentContainerDone,
} from './styles'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { handleToggleTaskDone, handleDeleteTask } = useContext(TaskContext)

  const isTaskDone = task.done

  return (
    <TaskCardContainer>
      {isTaskDone ? (
        <button onClick={() => handleToggleTaskDone(task.id)}>
          <CheckCircle size={24} weight="fill" color="#00875F" />
        </button>
      ) : (
        <button onClick={() => handleToggleTaskDone(task.id)}>
          <Circle size={24} color="#555" />
        </button>
      )}
      {isTaskDone ? (
        <TaskContentContainerDone>{task.content}</TaskContentContainerDone>
      ) : (
        <TaskContentContainer>{task.content}</TaskContentContainer>
      )}
      <button title="delete" onClick={() => handleDeleteTask(task.id)}>
        <Trash size={24} color="#555" />
      </button>
    </TaskCardContainer>
  )
}
