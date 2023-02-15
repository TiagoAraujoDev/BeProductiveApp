import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import {
  CheckSquareOffset,
  Gear,
  Moon,
  RocketLaunch,
  Scroll,
  Sun,
  Timer,
} from 'phosphor-react'

import { ThemeToggleContext } from '../../contexts/ThemeContext'

import {
  HeaderContainer,
  LogoContainer,
  ProfileInfo,
  ProfileInfoContainer,
  ThemeButton,
} from './styles'
import { Avatar } from './Avatar'
import { EditProfile } from './EditProfile'
import { TriggerContainer } from './EditProfile/styles'

export const Header = () => {
  const { changeTheme, themeName } = useContext(ThemeToggleContext)

  const handleChangeTheme = () => {
    changeTheme()
  }

  return (
    <HeaderContainer>
      <LogoContainer>
        <span>Focus</span>
        <RocketLaunch size={32} color="#00875F" />
      </LogoContainer>
      <nav>
        <NavLink to="/" end title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/todo" title="todo">
          <CheckSquareOffset size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
        <TriggerContainer title="Edit profile">
          <EditProfile>
            <Gear size={24} />
          </EditProfile>
        </TriggerContainer>
        <ThemeButton onClick={handleChangeTheme}>
          {themeName === 'dark' ? (
            <Sun size={24} color="#ebce3d" weight="bold" />
          ) : (
            <Moon size={24} color="#000" weight="bold" />
          )}
        </ThemeButton>
      </nav>
      <ProfileInfoContainer>
        <ProfileInfo>
          <span>TiagoDev</span>
          <span>tiagoaraujo@gmail.com</span>
        </ProfileInfo>
        <Avatar />
      </ProfileInfoContainer>
    </HeaderContainer>
  )
}
