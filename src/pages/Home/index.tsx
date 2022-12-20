import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { useContext, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleform'

import { CycleContext } from '../../contexts/CyclesContext'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const createCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'You need to enter a task!'),
  minutesAmount: zod
    .number()
    .min(0, 'The value should be bigger than 0!')
    .max(60, 'The value should be smaller than 60!'),
})

type NewCycleFormData = zod.infer<typeof createCycleFormValidationSchema>

export function Home() {
  const taskRef = useRef('')
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CycleContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(createCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interrupt
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
