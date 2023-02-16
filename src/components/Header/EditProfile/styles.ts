import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const TriggerContainer = styled.div`
  cursor: pointer;

  width: 3rem;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Ovarlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
`

export const Content = styled(Dialog.Content)`
  background-color: ${(props) => props.theme['gray-700']};
  border-radius: 8px;
  box-shadow: hsl(100 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 2rem;
`
export const Title = styled(Dialog.Title)`
  color: ${(props) => props.theme['gray-100']};
  margin-bottom: 2rem;
  text-align: center;
`
export const Avatar = styled.div`
  position: relative;
  margin: 0 auto 2rem;

  width: 8rem;
  height: 8rem;

  > img {
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
  }

  & input#avatar {
    display: none;
  }

  & label {
    width: 2rem;
    height: 2rem;
    position: absolute;
    right: 5px;
    bottom: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    background-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['gray-100']};

    cursor: pointer;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto;

  label {
    position: absolute;
    left: -9999999px;
  }

  & input {
    background-color: transparent;
    height: 2.5rem;
    width: 100%;
    margin-bottom: 1rem;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme['gray-500']};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${(props) => props.theme['gray-100']};

    &:focus {
      box-shadow: none;
      border-bottom: 2px solid ${(props) => props.theme['green-500']};
    }

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    width: 100%;
    padding: 0.5rem;
    margin-top: 1rem;
    border-radius: 8px;
    border: none;
    color: ${(props) => props.theme['gray-300']};
    background-color: ${(props) => props.theme['green-500']};
    cursor: pointer;

    &:not(:disabled):hover {
      filter: brightness(0.8);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`

export const Close = styled(Dialog.Close)`
  width: 1.3rem;
  height: 1.3rem;
  position: absolute;
  top: 15px;
  right: 15px;

  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme['red-500']};
  }
`
