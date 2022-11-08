import { useContext } from 'react'
import { PlusCircle } from 'phosphor-react'

import { TaskContext } from '../../../../contexts/TasksContext'

import { ButtonTask, FormContainer, InputTask } from './styles'
import { useFormContext } from 'react-hook-form'

export function NewTaskForm() {
  const { handleCreateTask } = useContext(TaskContext)
  const { handleSubmit, register } = useFormContext()

  return (
    <FormContainer onSubmit={handleSubmit(handleCreateTask)} action="">
      <InputTask
        id="taskContent"
        type="text"
        placeholder="Add your task..."
        {...register('taskContent')}
      />
      <ButtonTask>
        Task
        <PlusCircle size={24} />
      </ButtonTask>
    </FormContainer>
  )
}
