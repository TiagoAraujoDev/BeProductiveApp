import { Clipboard } from 'phosphor-react'
import { EmptyTaskContainer } from './styles'

export function EmptyTask() {
  return (
    <EmptyTaskContainer>
      <Clipboard size={64} color="#555" />
      <span>You haven&apos;t created a task yet!</span>
      <span>Create a task and organize your to-do items!</span>
    </EmptyTaskContainer>
  )
}
