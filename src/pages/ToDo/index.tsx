import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { TaskContext } from '../../contexts/TasksContext'
import { EmptyTask } from './components/EmptyTask'
import { NewTaskForm } from './components/NewTaskForm'
import { TaskCard } from './components/TaskCard'

import {
  InfoContainer,
  SummaryContainer,
  TaskCardsBox,
  TaskContainer,
  TaskCounter,
  TasksBox,
} from './styles'

import todoLogo from '../../assets/todoLogo.svg'

const createTaskFormValidationSchema = zod.object({
  taskContent: zod.string().min(1, 'Enter a task!'),
})

type NewTaskFormData = zod.infer<typeof createTaskFormValidationSchema>

export function ToDo() {
  const { tasks, handleCreateTask, countDoneTasks } = useContext(TaskContext)

  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(createTaskFormValidationSchema),
    defaultValues: {
      taskContent: '',
    },
  })

  const { handleSubmit, reset } = newTaskForm

  function createTask(data: NewTaskFormData): void {
    handleCreateTask(data)
    reset()
  }

  const totalTasksCount = tasks.length

  return (
    <TaskContainer>
      <img src={todoLogo} alt="" />
      <form onSubmit={handleSubmit(createTask)} action="">
        <FormProvider {...newTaskForm}>
          <NewTaskForm />
        </FormProvider>
      </form>
      <TasksBox>
        <SummaryContainer>
          <InfoContainer>
            <span>Tasks created</span>
            <TaskCounter>{totalTasksCount}</TaskCounter>
          </InfoContainer>
          <InfoContainer>
            <span>Tasks finished</span>
            <TaskCounter>
              {countDoneTasks()} de {totalTasksCount}
            </TaskCounter>
          </InfoContainer>
        </SummaryContainer>
        <TaskCardsBox>
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <EmptyTask />
          )}
        </TaskCardsBox>
      </TasksBox>
    </TaskContainer>
  )
}
