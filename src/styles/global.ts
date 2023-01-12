import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:focus {
  outline: none;
  box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']}
}

#root {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

body {
  height: 100vh;
  width: 100vw;
  margin: auto;
  background: ${(props) => props.theme['gray-900']};
  color: ${(props) => props.theme.white};;
  -webkit-font-smoothing: antialiased;
}

body, input, button, textarea {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-weight: 400;
}
`
