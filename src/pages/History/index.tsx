import { formatDistanceToNow } from 'date-fns'
// import ptBr from 'date-fns/locale/pt-BR'
import { useContext } from 'react'

import { CycleContext } from '../../contexts/CyclesContext'

import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CycleContext)

  function formatDate(date: Date): string {
    const formatedDate = formatDistanceToNow(date, {
      addSuffix: true,
      // locale: ptBr,
    })
    return formatedDate
  }

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
                    {cycle.finishedDate && (
                      <Status statusColor={'green'}>Completed</Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status statusColor={'red'}>Interrupted</Status>
                    )}
                    {!cycle.interruptedDate && !cycle.finishedDate && (
                      <Status statusColor={'yellow'}>In progress</Status>
                    )}
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
