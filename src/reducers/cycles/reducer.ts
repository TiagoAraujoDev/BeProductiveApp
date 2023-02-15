import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

interface Action {
  type: string
  payload?: any
}

export function cyclesReducer(state: CycleState, action: Action) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload!.newCycle)
        draft.activeCycleId = action.payload!.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.DELETE_CYCLE_FROM_HISTORY: {
      const cycleIndex = state.cycles.findIndex(
        (cycle) => action.payload.id === cycle.id,
      )

      if (cycleIndex === -1) {
        return state
      }

      const updatedCycles = state.cycles.filter(
        (cycle) => cycle.id !== action.payload.id,
      )

      return produce(state, (draft) => {
        draft.cycles = [...updatedCycles]
      })
    }
    case ActionTypes.INITIALIZE_STATE: {
      return produce(state, (draft) => {
        draft.cycles = [...action.payload.cycles]
        draft.activeCycleId = action.payload.activeCycleId
      })
    }
    default:
      return state
  }
}
