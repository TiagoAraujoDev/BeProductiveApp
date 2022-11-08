import { PlusCircle } from 'phosphor-react'
import { ButtonTask, FormContainer, InputTask } from './styles'

export function NewTaskForm() {
  return (
    <FormContainer action="">
      <InputTask type="text" placeholder="Add your task..." />
      <ButtonTask>
        Task
        <PlusCircle size={24} />
      </ButtonTask>
    </FormContainer>
  )
}
