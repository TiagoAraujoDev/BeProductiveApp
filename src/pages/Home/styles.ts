import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3.5rem;

    button[type='submit'] {
      width: 100%;
      height: 4rem;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      background-color: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme['gray-100']};
      border: none;
      border-radius: 8px;

      &:not(:disabled):hover {
        background-color: ${(props) => props.theme['green-700']};
      }

      &:disabled {
        opacity: 0.7;
      }
    }
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;

  input {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme['gray-300']};

    &:first-child {
      flex: 1;
    }

    &:last-child {
      width: 72px;
    }
  }
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background-color: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`
export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`
