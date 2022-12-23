import styled from 'styled-components'

export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 20rem;
  height: fit-content;
  padding: 2.5rem 0rem;
  margin: auto;
  border-radius: 8px;
  background-color: ${(props) => props.theme['gray-700']};

  h2 {
    color: ${(props) => props.theme['green-300']};
    margin-bottom: 1rem;
  }

  span {
    color: ${(props) => props.theme['gray-300']};
  }
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  label {
    position: absolute;
    left: -9999999px;
  }

  input {
    background-color: transparent;
    height: 2.5rem;
    margin-bottom: 0.5rem;
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
  }

  button {
    width: 100%;
    padding: 0.5rem;
    margin-block: 1rem;
    border-radius: 8px;
    border: none;
    color: ${(props) => props.theme['gray-900']};
    background-color: ${(props) => props.theme['green-500']};
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }
`
