import { Clipboard } from 'phosphor-react'
import { EmptyTaskContainer } from './styles'

export function EmptyTask() {
  return (
    <EmptyTaskContainer>
      <Clipboard size={64} color="#555" />
      <span>Você ainda não tem tarefas cadastradas</span>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </EmptyTaskContainer>
  )
}
