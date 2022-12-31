import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect } from 'react'
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

export const ToDo = () => {
  const { tasks, handleCreateTask, countDoneTasks, fetchTasks } =
    useContext(TaskContext)

  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(createTaskFormValidationSchema),
    defaultValues: {
      taskContent: '',
    },
  })
  const { handleSubmit, reset } = newTaskForm

  const createTask = (data: NewTaskFormData): void => {
    handleCreateTask(data)
    reset()
  }

  const totalTasksCount = tasks.length

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    fetchTasks(controller, isMounted)

    return () => {
      isMounted = false
      controller.abort()
    }
  })

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
