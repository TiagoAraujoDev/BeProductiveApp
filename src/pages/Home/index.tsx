import { useState } from 'react'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

const createCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa!'),
  minutesAmount: zod
    .number()
    .min(0, 'O valor deve ser maior que 0!')
    .max(60, 'O valor deve ser menor que 60!'),
})

type NewCycleFormData = zod.infer<typeof createCycleFormValidationSchema>

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(createCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    //  TODO:
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id, 
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  console.log(activeCycle)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto..."
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Option 1" />
            <option value="Option 2" />
            <option value="Option 3" />
            <option value="Option 4" />
          </datalist>
          <label htmlFor="number">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            min={5}
            max={60}
            step={5}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
