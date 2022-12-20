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
  const { handleToggleTaskDone, handleDeleteTask, handleSetTaskTitleInTimer } =
    useContext(TaskContext)

  const isTaskDone = task.done

  return (
    <TaskCardContainer>
      {isTaskDone ? (
        <CheckButton onClick={() => handleToggleTaskDone(task.id)}>
          <CheckCircle size={24} weight="fill" color="#00875F" />
        </CheckButton>
      ) : (
        <CheckButton onClick={() => handleToggleTaskDone(task.id)}>
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
