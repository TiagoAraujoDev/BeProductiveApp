import { differenceInSeconds } from 'date-fns'
import { createContext, ReactNode, useReducer, useState } from 'react'

import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  deleteCycleFromHistoryAction,
  markCurrentCycleAsFinishedAction,
  intializeStateAction,
} from '../reducers/cycles/actions'
import { useApiPrivate } from '../hooks/useAxiosPrivate'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { useNavigate } from 'react-router-dom'

interface CycleFormData {
  task: string
  minutesAmount: number
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  setSecondsPassed: (sec: number) => void
  finishCurrentCycle: () => void
  interruptCurrentCycle: () => void
  deleteCycle: (id: string) => void
  createNewCycle: (data: CycleFormData) => void
  fetchCycles: (controller: AbortController, isMounted: boolean) => void
}

interface CycleContextProviderProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleContextType)

export const CycleContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const apiPrivate = useApiPrivate()
  const navigate = useNavigate()

  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  const fetchCycles = async (
    controller: AbortController,
    isMounted: boolean,
  ): Promise<void> => {
    try {
      const response = await apiPrivate.get('/cycles', {
        signal: controller.signal,
      })
      const cycles = response.data
      const activeCycle = activeCycleId

      isMounted && dispatch(intializeStateAction(cycles, activeCycle))
    } catch (err: any) {
      if (err?.response?.status === 403) {
        navigate('/signin')
      }
    }
  }

  const createNewCycle = async (data: CycleFormData) => {
    try {
      const response = await apiPrivate.post('/cycles', {
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date(),
      })

      const cycle: Cycle = response.data

      const newCycle: Cycle = {
        id: cycle.id,
        task: cycle.task,
        minutesAmount: cycle.minutesAmount,
        startDate: cycle.startDate,
      }

      dispatch(addNewCycleAction(newCycle))

      setAmountSecondsPassed(0)
    } catch (err: any) {
      if (err?.response?.status === 403) {
        navigate('/signin')
      }
    }
  }

  const deleteCycle = async (id: string) => {
    try {
      const response = await apiPrivate.delete('/cycles/cycle', {
        headers: {
          id,
        },
      })

      if (response?.status === 204) {
        dispatch(deleteCycleFromHistoryAction(id))
      }
    } catch (err: any) {
      if (err?.response?.status === 403) {
        navigate('/signin')
      }
    }
  }

  const interruptCurrentCycle = async () => {
    try {
      await apiPrivate.patch(
        '/cycles/cycle/interrupt',
        {},
        {
          headers: {
            id: `${activeCycle?.id}`,
          },
        },
      )
      dispatch(interruptCurrentCycleAction())
    } catch (err: any) {
      if (err?.response?.status === 403) {
        navigate('/signin')
      }
    }
  }

  const finishCurrentCycle = async () => {
    try {
      await apiPrivate.patch(
        '/cycles/cycle/finish',
        {},
        {
          headers: {
            id: activeCycle?.id,
          },
        },
      )
      dispatch(markCurrentCycleAsFinishedAction())
    } catch (err: any) {
      if (err?.response?.status === 403) {
        navigate('/signin')
      }
    }
  }

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        setSecondsPassed,
        finishCurrentCycle,
        createNewCycle,
        interruptCurrentCycle,
        deleteCycle,
        fetchCycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
