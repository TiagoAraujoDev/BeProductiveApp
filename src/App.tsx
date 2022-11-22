import { CycleContextProvider } from './contexts/CyclesContext'
import { TasksContextProvider } from './contexts/TasksContext'
import { Theme } from './contexts/ThemeContext'
import { Router } from './Router'

import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <TasksContextProvider>
      <CycleContextProvider>
        <Theme>
          <Router />
          <GlobalStyle />
        </Theme>
      </CycleContextProvider>
    </TasksContextProvider>
  )
}
