import { PlusCircle } from 'phosphor-react'

import { ButtonTask, FormContainer, InputTask } from './styles'
import { useFormContext } from 'react-hook-form'

export function NewTaskForm() {
  const { register } = useFormContext()

  return (
    <FormContainer>
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
