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
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
`
