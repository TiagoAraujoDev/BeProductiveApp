import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { AxiosError } from 'axios'
// import { useNavigate } from 'react-router-dom'

import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  deleteCycleFromHistoryAction,
  markCurrentCycleAsFinishedAction,
  intializeStateAction,
} from '../reducers/cycles/actions'
import { useApiPrivate } from '../hooks/useAxiosPrivate'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { SessionContext } from './SessionContext'

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
  fetchCycles: (
    controller: AbortController,
    isMounted: boolean,
    token: string,
  ) => void
}

interface CycleContextProviderProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleContextType)

export const CycleContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const apiPrivate = useApiPrivate()
  // const navigate = useNavigate()

  const { auth } = useContext(SessionContext)

  const [isFirstLoad, setIsFirstLoad] = useState(true)
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

  useEffect(() => {
    if (isFirstLoad) {
      const controller = new AbortController()
      let isMounted = true

      fetchCycles(controller, isMounted, auth.token)

      setIsFirstLoad(false)

      return () => {
        controller.abort()
        isMounted = false
      }
    } else {
      console.log('here')
      localStorage.setItem(
        '@focus:ActiveCycleId',
        `${cyclesState.activeCycleId}`,
      )
    }

    // eslint-disable-next-line
  }, [cyclesState])

  const fetchCycles = async (
    controller: AbortController,
    isMounted: boolean,
    token: string,
  ): Promise<void> => {
    try {
      const response = await apiPrivate.get('/cycles', {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const cycles = response.data

      const activeCycleId = localStorage.getItem('@focus:ActiveCycleId')

      isMounted && dispatch(intializeStateAction(cycles, activeCycleId))
    } catch (err: any) {
      if (err instanceof AxiosError) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
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
      const activeCycleId = cycle.id
      localStorage.setItem('@focus:ActiveCycleId', activeCycleId)

      dispatch(addNewCycleAction(newCycle))

      setAmountSecondsPassed(0)
    } catch (err: any) {
      if (err instanceof AxiosError) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
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
      if (err instanceof AxiosError) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
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
      if (err instanceof AxiosError) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
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
      if (err instanceof AxiosError) {
        console.log('name', err.name)
        console.log('code', err.code)
        console.log('message', err.message)
        console.log('Stack', err.stack)
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
