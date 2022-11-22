import { createContext, ReactNode, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { defaultTheme, lightTheme } from '../styles/themes/default'

interface ThemeToggleType {
  changeTheme: () => void
  themeName: 'dark' | 'light'
}

interface ThemeProps {
  children: ReactNode
}

export const ThemeToggleContext = createContext({} as ThemeToggleType)

export const Theme = ({ children }: ThemeProps) => {
  const [isThemeDark, setIsThemeDark] = useState<boolean>(true)
  const [themeName, setThemeName] = useState<'dark' | 'light'>('dark')

  const changeTheme = () => {
    setIsThemeDark(!isThemeDark)
    setThemeName((state) => {
      if (state === 'dark') return 'light'
      return 'dark'
    })
  }

  return (
    <ThemeToggleContext.Provider value={{ changeTheme, themeName }}>
      <ThemeProvider theme={isThemeDark ? defaultTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  )
}
