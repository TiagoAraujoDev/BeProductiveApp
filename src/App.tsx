import { ThemeProvider } from 'styled-components'

import { CycleContextProvider } from './contexts/CyclesContext'
import { TasksContextProvider } from './contexts/TasksContext'
import { Router } from './Router'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TasksContextProvider>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </TasksContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
