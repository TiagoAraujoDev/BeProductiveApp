import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${(props) => props.theme['gray-100']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`

export const LogoContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  span:first-child {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const ThemeButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  width: 3rem;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const ProfileInfoContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin-right: 0.5rem;

  &:first-child {
    color: ${(props) => props.theme['gray-100']};
  }
  & > span + span {
    color: ${(props) => props.theme['gray-400']};
  }
`
