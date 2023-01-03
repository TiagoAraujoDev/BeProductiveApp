import { CheckCircle, Circle, Play, Trash } from 'phosphor-react'
import { useContext } from 'react'

import { Task, TaskContext } from '../../../../contexts/TasksContext'

import {
  CheckButton,
  PlayButton,
  TaskCardContainer,
  TaskContentContainer,
  TaskContentContainerDone,
  TrashButton,
} from './styles'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const { toggleTaskDoneStatus, deleteTask, setTaskTitleInTimer } =
    useContext(TaskContext)

  const isTaskDone = task.done

  const handleDeleteTask = (id: string): void => {
    deleteTask(id)
  }

  const handleToggleTaskDoneStatus = (id: string): void => {
    toggleTaskDoneStatus(id)
  }

  const handleSetTaskTitleInTimer = (title: string): void => {
    setTaskTitleInTimer(title)
  }

  return (
    <TaskCardContainer>
      {isTaskDone ? (
        <CheckButton onClick={() => handleToggleTaskDoneStatus(task.id)}>
          <CheckCircle size={24} weight="fill" color="#00875F" />
        </CheckButton>
      ) : (
        <CheckButton onClick={() => handleToggleTaskDoneStatus(task.id)}>
          <Circle size={24} color="#555" />
        </CheckButton>
      )}
      {isTaskDone ? (
        <TaskContentContainerDone>{task.title}</TaskContentContainerDone>
      ) : (
        <TaskContentContainer>{task.title}</TaskContentContainer>
      )}
      <PlayButton
        onClick={() => handleSetTaskTitleInTimer(task.title)}
        title="Initialize timer"
      >
        <Play size={24} />
      </PlayButton>
      <TrashButton title="delete" onClick={() => handleDeleteTask(task.id)}>
        <Trash size={24} />
      </TrashButton>
    </TaskCardContainer>
  )
}
