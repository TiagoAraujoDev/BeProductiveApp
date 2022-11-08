import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { NewTaskForm } from './components/NewTaskForm'
import { TaskCard } from './components/TaskCard'
import { EmptyTask } from './components/EmptyTask'
import { TaskContext } from '../../contexts/TasksContext'

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
  const { tasks } = useContext(TaskContext)

  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(createTaskFormValidationSchema),
    defaultValues: {
      taskContent: '',
    },
  })

  console.log(tasks)

  return (
    <TaskContainer>
      <img src={todoLogo} alt="" />
      <FormProvider {...newTaskForm}>
        <NewTaskForm />
      </FormProvider>
      <TasksBox>
        <SummaryContainer>
          <div>
            <span>Tasks created</span>
            <TaskCounter>0</TaskCounter>
          </div>
          <div>
            <span>Tasks finished</span>
            <TaskCounter>0</TaskCounter>
          </div>
        </SummaryContainer>
        <TaskCardsBox>
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard key={task.id} />)
          ) : (
            <EmptyTask />
          )}
        </TaskCardsBox>
      </TasksBox>
    </TaskContainer>
  )
}
