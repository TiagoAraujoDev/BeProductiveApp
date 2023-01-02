import { PlusCircle } from 'phosphor-react'
import { useFormContext } from 'react-hook-form'

import { ButtonTask, FormContainer, InputTask } from './styles'

export function NewTaskForm() {
  const { register } = useFormContext()

  return (
    <FormContainer>
      <InputTask
        id="taskContent"
        type="text"
        placeholder="Add your task..."
        autoComplete="off"
        {...register('title')}
      />
      <ButtonTask>
        <PlusCircle size={24} />
        Task
      </ButtonTask>
    </FormContainer>
  )
}
