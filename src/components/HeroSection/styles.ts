import styled from 'styled-components'

export const HeroContainer = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme['gray-600']};
  padding-right: 1.5rem;
  width: 35rem;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: ${(props) => props.theme['green-500']};
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.6;
    color: ${(props) => props.theme['gray-300']};
  }
`
