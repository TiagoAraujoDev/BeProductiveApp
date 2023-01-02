import { useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { CycleContext } from '../../../../contexts/CyclesContext'
import { TaskContext } from '../../../../contexts/TasksContext'

import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export const NewCycleForm = () => {
  const { activeCycle } = useContext(CycleContext)
  const { taskTitle } = useContext(TaskContext)

  const { register, setValue } = useFormContext()

  useEffect(() => {
    setValue('task', taskTitle)
  }, [taskTitle, setValue])

  return (
    <FormContainer>
      <label htmlFor="task">I&apos;ll work on</label>
      <TaskInput
        id="task"
        placeholder="Give a name to the project..."
        disabled={!!activeCycle}
        {...register('task')}
      />
      <label htmlFor="number">countdown</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        min={5}
        max={60}
        step={5}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  )
}
