import styled from 'styled-components'

export const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  margin: 2rem auto;
`

export const InputTask = styled.input`
  flex: 1;
  background-color: transparent;
  height: 2.5rem;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-500']};

  &:focus {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`

export const ButtonTask = styled.button`
  width: 5rem;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme['green-500']};
  border-radius: 8px;
  background-color: transparent;
  color: ${(props) => props.theme['green-500']};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['gray-100']};
    transition: all ease 0.2s;
  }
`
