import styled from 'styled-components'

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
`
const BaseInput = styled.input`
  background-color: transparent;
  height: 2.5rem;
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

  &:-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus {
    border: none;
    border-bottom: 2px solid ${(props) => props.theme['green-500']};
    -webkit-text-fill-color: ${(props) => props.theme['gray-100']};
    -webkit-box-shadow: none;
    box-shadow: none;
    transition: background-color 5000s ease-in-out 0s;
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 72px;
`
