import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { TaskContext } from '../../contexts/TasksContext'
import { EmptyTask } from './components/EmptyTask'
import { NewTaskForm } from './components/NewTaskForm'
import { TaskCard } from './components/TaskCard'

import {
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
  const { tasks, handleCreateTask } = useContext(TaskContext)

  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(createTaskFormValidationSchema),
    defaultValues: {
      taskContent: '',
    },
  })

  const { handleSubmit } = newTaskForm

  console.log(tasks)

  return (
    <TaskContainer>
      <img src={todoLogo} alt="" />
      <form onSubmit={handleSubmit(handleCreateTask)} action="">
        <FormProvider {...newTaskForm}>
          <NewTaskForm />
        </FormProvider>
      </form>
      <TasksBox>
        <SummaryContainer>
          <div>
            <span>Tasks created</span>
            <TaskCounter>{tasks.length}</TaskCounter>
          </div>
          <div>
            <span>Tasks finished</span>
            <TaskCounter>0</TaskCounter>
          </div>
        </SummaryContainer>
        <TaskCardsBox>
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} text={task.content} />)
          ) : (
            <EmptyTask />
          )}
        </TaskCardsBox>
      </TasksBox>
    </TaskContainer>
  )
}
