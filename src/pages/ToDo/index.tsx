import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { TaskContext } from '../../contexts/TasksContext'
import { EmptyTask } from './components/EmptyTask'
import { NewTaskForm } from './components/NewTaskForm'
import { TaskCard } from './components/TaskCard'
import { Loading } from '../../components/Loading'

import {
  InfoContainer,
  SummaryContainer,
  TaskCardsBox,
  TaskContainer,
  TaskCounter,
  TasksBox,
} from './styles'

import todoLogo from '../../assets/todoLogo.svg'
import { SessionContext } from '../../contexts/SessionContext'

const createTaskFormValidationSchema = zod.object({
  title: zod.string().min(1, 'Enter a task!'),
})

type NewTaskFormData = zod.infer<typeof createTaskFormValidationSchema>

export const ToDo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { auth } = useContext(SessionContext)
  const { tasks, createTask, countDoneTasks, fetchTasks } =
    useContext(TaskContext)

  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(createTaskFormValidationSchema),
    defaultValues: {
      title: '',
    },
  })
  const { handleSubmit, reset } = newTaskForm

  const handleCreateTask = async (data: NewTaskFormData): Promise<void> => {
    try {
      setIsLoading(true)
      await createTask(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
    reset()
  }

  const totalTasksCount = tasks.length

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    fetchTasks(controller, isMounted, auth.token)

    return () => {
      isMounted = false
      controller.abort()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <TaskContainer>
      <img src={todoLogo} alt="" />
      <form onSubmit={handleSubmit(handleCreateTask)}>
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
          {isLoading ? (
            <Loading height="10rem" />
          ) : tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <EmptyTask />
          )}
        </TaskCardsBox>
      </TasksBox>
    </TaskContainer>
  )
}
