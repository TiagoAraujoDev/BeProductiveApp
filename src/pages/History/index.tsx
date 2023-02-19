import { formatDistanceToNow } from 'date-fns'
import { X } from 'phosphor-react'
import { useContext, useEffect } from 'react'

import { CycleContext } from '../../contexts/CyclesContext'
import { SessionContext } from '../../contexts/SessionContext'

import {
  HistoryContainer,
  HistoryList,
  Status,
  StatusContainer,
} from './styles'

export const History = () => {
  const { cycles, fetchCycles, deleteCycle } = useContext(CycleContext)
  const { auth } = useContext(SessionContext)

  function formatDate(date: Date): string {
    const formatedDate = formatDistanceToNow(date, {
      addSuffix: true,
    })
    return formatedDate
  }

  const handleDeleteCycle = (id: string) => {
    deleteCycle(id)
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    fetchCycles(controller, isMounted, auth.token)

    return () => {
      isMounted = false
      controller.abort()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <HistoryContainer>
      <h1>My history</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutes</td>
                  <td>{formatDate(new Date(cycle.startDate))}</td>
                  <td>
                    <StatusContainer>
                      {cycle.finishedDate && (
                        <Status statusColor={'green'}>Completed</Status>
                      )}
                      {cycle.interruptedDate && (
                        <Status statusColor={'red'}>Interrupted</Status>
                      )}
                      {!cycle.interruptedDate && !cycle.finishedDate && (
                        <Status statusColor={'yellow'}>In progress</Status>
                      )}
                      <span
                        className="delete"
                        onClick={() => handleDeleteCycle(cycle.id)}
                      >
                        <X size={18} />
                      </span>
                    </StatusContainer>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
